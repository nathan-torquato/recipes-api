import { GetRecipeProvider, GIFProvider } from '../../providers';

export class GetRecipesUseCase {
	constructor(
		private getRecipeProvider: GetRecipeProvider,
		private gifProvider: GIFProvider,
	) {}

	async execute(ingredients: string[]): Promise<any> {
		await this.getRecipeProvider.getRecipes(ingredients);
		await this.gifProvider.getByKeyword('');
		return null;
	}
}
