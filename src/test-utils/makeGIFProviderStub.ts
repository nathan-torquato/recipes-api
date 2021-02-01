import { GIFProvider } from '../providers';

export function makeGIFProviderStub(): GIFProvider {
	class ProviderStub implements GIFProvider {
		async getByKeyword(keyword: string): Promise<string[]> {
			return [];
		}
	}

	return new ProviderStub();
}
