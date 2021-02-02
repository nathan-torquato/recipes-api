import axios from 'axios';
import { NotImplemented } from '../../errors';
import { GIFProvider } from '../protocols';

export class GiphyGIFProvider implements GIFProvider {
	async getByKeyword(keywords: string[]): Promise<Record<string, string>> {
		await this.fetch(keywords);
		return {};
	}

	private async fetch(keywords: string[]): Promise<Record<string, string>> {
		const URL = process.env.GIF_PUPPY_API_URL;
		const API_KEY = process.env.GIF_API_KEY;

		const gifResponseList = await Promise.all(
			keywords.map(async keyword => {
				const { data } = await axios.get<GIFResponse>(URL, {
					params: {
						q: keyword,
						api_key: API_KEY,
						limit: 1,
					},
				});

				this.validateResponse(data);
				this.validateGIFObjectSchema(data.data[0]);
				return data.data[0].images.original.url;
			}),
		);

		const gifByKeyword = keywords.reduce<Record<string, string>>((acc, key, index) => {
			acc[key] = gifResponseList[index];
			return acc;
		}, {});

		return gifByKeyword;
	}

	private validateResponse(response: GIFResponse): void {
		const { data } = response;
		if (!data || !Array.isArray(data)) {
			const value = JSON.stringify(response);
			throw new NotImplemented(
				`Response from Giphy API has changed. Received value: ${value}`,
			);
		}
	}

	private validateGIFObjectSchema(object: GIFObject): void {
		if (!object.images) {
			const value = JSON.stringify(object);
			throw new NotImplemented(
				`Response from Giphy API has changed object schema. Received value: ${value}`,
			);
		}

		if (object?.images?.original?.url) {
			return;
		}

		const prefix = "The following props wern't found in RecipePuppy API Response";
		const suffix = 'original.url';
		throw new NotImplemented(`${prefix}: ${suffix}.`);
	}
}

export interface GIFResponse {
	data: GIFObject[];
}

interface GIFObject {
	id: string;
	images: GIFImageObject;
}

interface GIFImageObject {
	original: {
		height: string;
		width: string;
		size: string;
		url: string;
	};
}
