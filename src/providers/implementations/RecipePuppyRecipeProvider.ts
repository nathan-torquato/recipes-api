import axios from 'axios';
import { NotImplemented } from '../../errors';
import { RawRecipe } from '../../protocols';
import { RecipeProvider } from '../protocols';

export class RecipePuppyRecipeProvider implements RecipeProvider {
	async getByIngredients(ingredients: string[]): Promise<RawRecipe[]> {
		const response = await this.fetch(ingredients);
		this.validateResponse(response);
		this.validateRawRecipeSchema(response.results);

		return response.results;
	}

	private async fetch(ingredients: string[]): Promise<APIResponse> {
		const URL = process.env.RECIPE_PUPPY_API_URL;

		const { data } = await axios.get<APIResponse>(URL, {
			params: {
				i: ingredients.join(','),
			},
		});

		return data;
	}

	private validateResponse(response: APIResponse): void {
		const { results } = response;
		if (!results || !Array.isArray(results)) {
			const value = JSON.stringify(response);
			throw new NotImplemented(
				`Response from RecipePuppy API has changed. Received value: ${value}`,
			);
		}
	}

	private validateRawRecipeSchema(recipes: RawRecipe[]): void {
		const expectedKeys: Array<keyof RawRecipe> = [
			'title',
			'href',
			'ingredients',
			'thumbnail',
		];

		recipes.forEach(recipe => {
			const missingKeys = expectedKeys.filter(key => !(key in recipe));
			if (!missingKeys.length) {
				return;
			}

			const prefix = "The following props wern't found in RecipePuppy API Response";
			const suffix = missingKeys.join(', ');
			throw new NotImplemented(`${prefix}: ${suffix}.`);
		});
	}
}

interface APIResponse {
	results: RawRecipe[];
}
