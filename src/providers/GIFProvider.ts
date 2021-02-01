export interface GIFProvider {
	getByKeyword(keyword: string): Promise<string[]>;
}
