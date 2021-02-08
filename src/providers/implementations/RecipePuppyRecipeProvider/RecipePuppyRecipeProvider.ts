import axios from 'axios';
import { NotImplemented } from '../../../errors';
import { RawRecipe } from '../../../protocols';
import { RecipeProvider } from '../../protocols';
import { RecipePuppyAPIResponse } from './protocols';

export class RecipePuppyRecipeProvider implements RecipeProvider {
	constructor(private baseURL: string) {}

	async getByIngredients(ingredients: string[]): Promise<RawRecipe[]> {
		const response = await this.fetch(ingredients);
		this.validateResponse(response);
		this.validateRawRecipeSchema(response.results);

		return response.results;
	}

	private async fetch(ingredients: string[]): Promise<RecipePuppyAPIResponse> {
		const { data } = await axios.get<RecipePuppyAPIResponse>(this.baseURL, {
			params: {
				i: ingredients.join(','),
			},
		});

		return data;
	}

	private validateResponse(response: RecipePuppyAPIResponse): void {
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
