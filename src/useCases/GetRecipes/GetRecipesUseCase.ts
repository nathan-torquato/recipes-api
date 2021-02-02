import { RawRecipe, Recipe, RecipeList } from '../../protocols';
import { RecipeProvider, GIFProvider } from '../../providers';

export class GetRecipesUseCase {
	constructor(private recipeProvider: RecipeProvider, private gifProvider: GIFProvider) {}

	async execute(ingredients: string[]): Promise<RecipeList> {
		const rawRecipes = await this.recipeProvider.getByIngredients(ingredients);
		const titles = rawRecipes.map(({ title }) => title);
		const gifByTitle = await this.gifProvider.getByKeyword(titles);

		const recipes: Recipe[] = rawRecipes.map(rawRecipe =>
			this.buildRecipe(rawRecipe, gifByTitle),
		);

		return {
			keywords: ingredients,
			recipes,
		};
	}

	private buildRecipe(rawRecipe: RawRecipe, gifByTitle: Record<string, string>): Recipe {
		const ingredients = rawRecipe.ingredients.split(', ').sort();

		return {
			title: rawRecipe.title,
			ingredients,
			link: rawRecipe.href,
			gif: gifByTitle[rawRecipe.title],
		};
	}
}
