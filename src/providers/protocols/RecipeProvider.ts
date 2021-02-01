import { RawRecipe } from '../../protocols';

export interface RecipeProvider {
	getByIngredients(ingredients: string[]): Promise<RawRecipe[]>;
}
