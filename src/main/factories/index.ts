import { GetRecipesController } from '../../useCases';

export function makeGetRecipesController(): GetRecipesController {
	return new GetRecipesController();
}
