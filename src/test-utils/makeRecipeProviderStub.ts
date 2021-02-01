import { Recipe } from '../protocols';
import { RecipeProvider } from '../providers';

export function makeRecipeProviderStub(): RecipeProvider {
	class ProviderStub implements RecipeProvider {
		async getByIngredients(ingredients): Promise<Recipe[]> {
			return [];
		}
	}

	return new ProviderStub();
}
