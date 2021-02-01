import { GetRecipeProvider } from '../../providers';

export class GetRecipesUseCase {
	// eslint-disable-next-line @typescript-eslint/prefer-readonly
	constructor(private getRecipeProvider: GetRecipeProvider) {}

	async execute(ingredients: string[]): Promise<any> {
		await this.getRecipeProvider.getRecipes(ingredients);
		return null;
	}
}
