import { GIFProvider } from '../providers';

export function makeGIFProviderStub(): GIFProvider {
	class ProviderStub implements GIFProvider {
		async getByKeyword(keyword: string[]): Promise<Record<string, string>> {
			return {};
		}
	}

	return new ProviderStub();
}
