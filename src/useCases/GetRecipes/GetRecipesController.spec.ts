import { BadRequest } from '../../errors';
import { HttpRequest } from '../../protocols';
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
		const httpRequest: HttpRequest = {
			query: {},
		};

		const promise = sut.handle(httpRequest);
		await expect(promise).rejects.toThrow(BadRequest);
	});

	test('should throw BadRequest if more than 3 ingredients are provided', async () => {
		const { sut } = makeSut();
		expect(sut).toBeDefined();
		const httpRequest: HttpRequest = {
			query: {
				i: 'onion,tomato,lettuce,orange',
			},
		};

		const promise = sut.handle(httpRequest);
		await expect(promise).rejects.toThrow(BadRequest);
	});
});
