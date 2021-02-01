import { Recipe } from '../../protocols';
import { RecipeProvider, GIFProvider } from '../../providers';

export class GetRecipesUseCase {
	constructor(private recipeProvider: RecipeProvider, private gifProvider: GIFProvider) {}

	async execute(ingredients: string[]): Promise<Recipe[]> {
		const recipesWithoutGIF = await this.recipeProvider.getByIngredients(ingredients);
		const titles = recipesWithoutGIF.map(({ title }) => title);
		const gifByTitle = await this.gifProvider.getByKeyword(titles);

		const recipes: Recipe[] = recipesWithoutGIF.map(recipe => ({
			title: recipe.title,
			ingredients: recipe.ingredients,
			link: recipe.link,
			gif: gifByTitle[recipe.title],
		}));

		return recipes;
	}
}
