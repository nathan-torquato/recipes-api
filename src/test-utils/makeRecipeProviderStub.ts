import { RawRecipe } from '../protocols';
import { RecipeProvider } from '../providers';

export function makeRecipeProviderStub(): RecipeProvider {
	class ProviderStub implements RecipeProvider {
		async getByIngredients(_ingredients): Promise<RawRecipe[]> {
			return [];
		}
	}

	return new ProviderStub();
}
