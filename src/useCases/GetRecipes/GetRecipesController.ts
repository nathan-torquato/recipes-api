import { BadRequest } from '../../errors';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class GetRecipesController implements Controller {
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const ingredients = httpRequest.query.i;
		if (!ingredients) {
			throw new BadRequest(
				'Request does not match expected pattern (/recipes/?i={ingredient_1},{ingredient_2},{ingredient_3})',
			);
		}

		return null;
	}
}
