import { BadRequest } from '../../errors';
import { GetRecipesController } from './GetRecipesController';

interface SutFactory {
	sut: GetRecipesController;
}

function makeSut(): SutFactory {
	const sut = new GetRecipesController();

	return {
		sut,
	};
}

describe('GetRecipesController', () => {
	test('should throw BadRequest if no ingredients are provided', async () => {
		const { sut } = makeSut();
		expect(sut).toBeDefined();
		const httpRequest: any = {
			query: {},
		};

		const promise = sut.handle(httpRequest);
		await expect(promise).rejects.toThrow(BadRequest);
	});
});
