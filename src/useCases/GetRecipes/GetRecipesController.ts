import { BadRequest } from '../../errors';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { GetRecipesUseCase } from './GetRecipesUseCase';

export class GetRecipesController implements Controller {
	private maximumQtyOfIngredients = 3;

	constructor(private getRecipesUseCase: GetRecipesUseCase) {}

	private getIngredients(httpRequest: HttpRequest): string[] {
		const ingredientsString = httpRequest.query.i as string;
		if (!ingredientsString) {
			throw new BadRequest(
				'Request does not match expected pattern (/recipes/?i={ingredient_1},{ingredient_2},{ingredient_3})',
			);
		}

		const ingredients = ingredientsString
			.split(',')
			.map(i => i.trim())
			.filter(Boolean);

		const ingredientsQty = ingredients.length;
		if (!ingredientsQty || ingredientsQty > this.maximumQtyOfIngredients) {
			throw new BadRequest(
				`You can provide from 1 to ${this.maximumQtyOfIngredients} ingredients`,
			);
		}

		return ingredients;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const ingredients = this.getIngredients(httpRequest);
		const recipes = await this.getRecipesUseCase.execute(ingredients);

		return {
			statusCode: 200,
			body: recipes,
		};
	}
}
