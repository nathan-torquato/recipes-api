import { Recipe } from '../../protocols';
import { RecipeProvider, GIFProvider } from '../../providers';

export class GetRecipesUseCase {
	constructor(private recipeProvider: RecipeProvider, private gifProvider: GIFProvider) {}

	private buildRecipes(rawRecipe: Recipe, gifByTitle): Recipe {
		return {
			title: rawRecipe.title,
			ingredients: rawRecipe.ingredients,
			link: rawRecipe.link,
			gif: gifByTitle[rawRecipe.title],
		};
	}

	async execute(ingredients: string[]): Promise<Recipe[]> {
		const recipesWithoutGIF = await this.recipeProvider.getByIngredients(ingredients);
		const titles = recipesWithoutGIF.map(({ title }) => title);
		const gifByTitle = await this.gifProvider.getByKeyword(titles);

		const recipes: Recipe[] = recipesWithoutGIF.map(rawRecipe =>
			this.buildRecipes(rawRecipe, gifByTitle),
		);

		return recipes;
	}
}
