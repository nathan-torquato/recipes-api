import axios from 'axios';
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

				return data.data[0].images.original.url;
			}),
		);

		const gifByKeyword = keywords.reduce<Record<string, string>>((acc, key, index) => {
			acc[key] = gifResponseList[index];
			return acc;
		}, {});

		return gifByKeyword;
	}
}

export interface GIFResponse {
	data: Array<{
		id: string;
		images: {
			original: {
				height: string;
				width: string;
				size: string;
				url: string;
			};
		};
	}>;
}
