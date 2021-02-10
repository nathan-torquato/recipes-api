import dotenv from 'dotenv';
import { GiphyGIFProvider, RecipePuppyRecipeProvider } from '../../providers/';
import { GetRecipesController, GetRecipesUseCase } from '../../useCases';

dotenv.config();

export function makeGetRecipesController(): GetRecipesController {
	const gifAPIBaseURL = (process.env.GIF_PUPPY_API_URL as unknown) as string;
	const gifAPIKey = (process.env.GIF_API_KEY as unknown) as string;
	const gifNotFoundURL = (process.env.GIF_NOT_FOUND_URL as unknown) as string;
	const gifProvider = new GiphyGIFProvider(gifAPIBaseURL, gifAPIKey, gifNotFoundURL);

	const recipePuppyApiUrl = (process.env.RECIPE_PUPPY_API_URL as unknown) as string;
	const recipeProvider = new RecipePuppyRecipeProvider(recipePuppyApiUrl);

	const getRecipesUseCase = new GetRecipesUseCase(recipeProvider, gifProvider);

	return new GetRecipesController(getRecipesUseCase);
}
