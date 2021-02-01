import { Controller, HttpResponse } from '../../protocols';

export class GetRecipesController implements Controller {
	async handle(): Promise<HttpResponse> {
		return {
			statusCode: 200,
			body: {
				data: 'GetRecipesController.handle',
			},
		};
	}
}
