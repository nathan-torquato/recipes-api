import { GetRecipeProvider } from '../../providers';

export class GetRecipesUseCase {
	constructor(private getRecipeProvider: GetRecipeProvider) {}

	async execute(ingredients: string[]): Promise<any> {
		await this.getRecipeProvider.getRecipes(ingredients);
		return null;
	}
}
