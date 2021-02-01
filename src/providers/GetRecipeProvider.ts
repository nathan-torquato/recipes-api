import { Recipe } from '../protocols';

export interface GetRecipeProvider {
	getRecipes(ingredients: string[]): Promise<Recipe[]>;
}
