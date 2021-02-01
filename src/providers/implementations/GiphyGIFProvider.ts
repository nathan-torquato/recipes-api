import { GIFProvider } from '../protocols';

export class GiphyGIFProvider implements GIFProvider {
	async getByKeyword(keywords: string[]): Promise<Record<string, string>> {
		return {};
	}
}
