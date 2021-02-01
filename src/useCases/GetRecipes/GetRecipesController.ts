import { BadRequest } from '../../errors';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class GetRecipesController implements Controller {
	private readonly maximumQtyOfIngredients = 3;

	private getIngredients(httpRequest: HttpRequest): string[] {
		const ingredientsString = httpRequest.query.i as string;
		if (!ingredientsString) {
			throw new BadRequest(
				'Request does not match expected pattern (/recipes/?i={ingredient_1},{ingredient_2},{ingredient_3})',
			);
		}

		const ingredients = ingredientsString.split(',');
		if (ingredients.length > this.maximumQtyOfIngredients) {
			throw new BadRequest(
				`You can provide from 1 to ${this.maximumQtyOfIngredients} ingredients`,
			);
		}

		return ingredients;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		this.getIngredients(httpRequest);
		return null;
	}
}
