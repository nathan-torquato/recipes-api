import {
	GiphyGIFProvider,
	RecipePuppyRecipeProvider,
} from '../../providers/implementations';
import { GetRecipesController, GetRecipesUseCase } from '../../useCases';

export function makeGetRecipesController(): GetRecipesController {
	const recipeProvider = new RecipePuppyRecipeProvider();
	const gifProvider = new GiphyGIFProvider();
	const getRecipesUseCase = new GetRecipesUseCase(recipeProvider, gifProvider);
	return new GetRecipesController(getRecipesUseCase);
}
