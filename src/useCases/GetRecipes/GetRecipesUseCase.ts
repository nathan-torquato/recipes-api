import { RawRecipe, Recipe } from '../../protocols';
import { RecipeProvider, GIFProvider } from '../../providers';

export class GetRecipesUseCase {
	constructor(private recipeProvider: RecipeProvider, private gifProvider: GIFProvider) {}

	private buildRecipes(rawRecipe: RawRecipe, gifByTitle): Recipe {
		const ingredients = rawRecipe.ingredients.split(', ').sort();

		return {
			title: rawRecipe.title,
			ingredients,
			link: rawRecipe.href,
			gif: gifByTitle[rawRecipe.title],
		};
	}

	async execute(ingredients: string[]): Promise<Recipe[]> {
		const rawRecipes = await this.recipeProvider.getByIngredients(ingredients);
		const titles = rawRecipes.map(({ title }) => title);
		const gifByTitle = await this.gifProvider.getByKeyword(titles);

		const recipes: Recipe[] = rawRecipes.map(rawRecipe =>
			this.buildRecipes(rawRecipe, gifByTitle),
		);

		return recipes;
	}
}
