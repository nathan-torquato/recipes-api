import { RawRecipe } from '../../src/protocols';
import { RecipeProvider } from '../../src/providers';

export function makeRecipeProviderStub(): RecipeProvider {
	class ProviderStub implements RecipeProvider {
		async getByIngredients(_ingredients: string[]): Promise<RawRecipe[]> {
			return [];
		}
	}

	return new ProviderStub();
}
