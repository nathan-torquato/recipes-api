import { RawRecipe } from '../../protocols';
import { RecipeProvider } from '../protocols';

export class RecipePuppyRecipeProvider implements RecipeProvider {
	async getByIngredients(_ingredients: string[]): Promise<RawRecipe[]> {
		return [];
	}
}
