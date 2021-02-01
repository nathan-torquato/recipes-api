import { Recipe } from '../protocols';
import { GetRecipeProvider } from '../providers';

export function makeGetRecipeProviderStub(): GetRecipeProvider {
	class ProviderStub implements GetRecipeProvider {
		async getRecipes(ingredients): Promise<Recipe[]> {
			return [];
		}
	}

	return new ProviderStub();
}
