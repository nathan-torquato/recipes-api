import axios from 'axios';
import { RawRecipe } from '../../protocols';
import { RecipeProvider } from '../protocols';

export class RecipePuppyRecipeProvider implements RecipeProvider {
	async getByIngredients(ingredients: string[]): Promise<RawRecipe[]> {
		const URL = process.env.RECIPE_PUPPY_API_URL;

		const { data } = await axios.get<APIResponse>(URL, {
			params: {
				i: ingredients.join(','),
			},
		});

		return data.results;
	}
}

interface APIResponse {
	results: RawRecipe[];
}
