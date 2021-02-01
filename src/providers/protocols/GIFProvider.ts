export interface GIFProvider {
	getByKeyword(keyword: string[]): Promise<Record<string, string>>;
}
