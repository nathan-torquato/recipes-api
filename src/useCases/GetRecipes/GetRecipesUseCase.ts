import { RecipeProvider, GIFProvider } from '../../providers';

export class GetRecipesUseCase {
	constructor(private recipeProvider: RecipeProvider, private gifProvider: GIFProvider) {}

	async execute(ingredients: string[]): Promise<any> {
		await this.recipeProvider.getByIngredients(ingredients);
		await this.gifProvider.getByKeyword('');
		return null;
	}
}
