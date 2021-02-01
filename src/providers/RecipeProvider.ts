import { Recipe } from '../protocols';

export interface RecipeProvider {
	getByIngredients(ingredients: string[]): Promise<Recipe[]>;
}
