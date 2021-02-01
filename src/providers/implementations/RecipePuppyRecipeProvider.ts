import axios from 'axios';
import { RawRecipe } from '../../protocols';
import { RecipeProvider } from '../protocols';

export class RecipePuppyRecipeProvider implements RecipeProvider {
	async getByIngredients(ingredients: string[]): Promise<RawRecipe[]> {
		const URL = process.env.RECIPE_PUPPY_API_URL;
		await axios.get(URL, {
			params: {
				i: ingredients.join(','),
			},
		});
		return [];
	}
}
