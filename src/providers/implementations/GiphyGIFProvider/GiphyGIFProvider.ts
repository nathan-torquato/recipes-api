import axios from 'axios';
import { NotImplemented } from '../../../errors';
import { GIFProvider } from '../../protocols';
import { GIFObject, GIFResponse } from './protocols';

export class GiphyGIFProvider implements GIFProvider {
	constructor(
		private baseUrl: string,
		private apiKey: string,
		private gifNotFoundURL: string,
	) {}

	async getByKeyword(keywords: string[]): Promise<Record<string, string>> {
		const gifResponseList = await this.fetch(keywords);
		const keywordGifMap = this.buildKeywordGIFMap(keywords, gifResponseList);

		return keywordGifMap;
	}

	private async fetch(keywords: string[]): Promise<string[]> {
		const gifResponseList = await Promise.all(
			keywords.map(async keyword => {
				const { data: response } = await axios.get<GIFResponse>(this.baseUrl, {
					params: {
						q: keyword,
						api_key: this.apiKey,
						limit: 1,
					},
				});

				this.validateResponse(response);
				if (!response.data.length) {
					return this.gifNotFoundURL;
				}

				this.validateGIFObjectSchema(response.data[0]);
				return response.data[0].images.original.url;
			}),
		);

		return gifResponseList;
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

		throw new NotImplemented(
			'Giphy API Response doesn not provide the url for the original image.',
		);
	}

	private buildKeywordGIFMap(
		keywords: string[],
		gifResponseList: string[],
	): Record<string, string> {
		return keywords.reduce<Record<string, string>>((acc, key, index) => {
			acc[key] = gifResponseList[index];
			return acc;
		}, {});
	}
}
