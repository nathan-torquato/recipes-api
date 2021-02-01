import { BadRequest } from '../../errors';
import { HttpRequest } from '../../protocols';
import { GetRecipesController } from './GetRecipesController';
import { GetRecipesUseCase } from './GetRecipesUseCase';

interface SutFactory {
	sut: GetRecipesController;
	useCase: GetRecipesUseCase;
}

function makeSut(): SutFactory {
	const useCase = new GetRecipesUseCase();
	const sut = new GetRecipesController(useCase);

	return {
		sut,
		useCase,
	};
}

function makeHttpRequest(): HttpRequest {
	return {
		query: {
			i: 'onion,tomato,lettuce',
		},
	};
}

describe('GetRecipesController', () => {
	test('should throw BadRequest if no ingredients are provided', async () => {
		const { sut } = makeSut();
		const httpRequest = makeHttpRequest();
		httpRequest.query = {};

		const promise = sut.handle(httpRequest);
		await expect(promise).rejects.toThrow(BadRequest);
	});

	test('should throw BadRequest if more than 3 ingredients are provided', async () => {
		const { sut } = makeSut();
		const httpRequest = makeHttpRequest();
		httpRequest.query.i += ',orange';

		const promise = sut.handle(httpRequest);
		await expect(promise).rejects.toThrow(BadRequest);
	});

	test('should call GetRecipesUseCase.execute', async () => {
		const { sut, useCase } = makeSut();
		const useCaseSpy = jest.spyOn(useCase, 'execute');
		const httpRequest = makeHttpRequest();

		await sut.handle(httpRequest);
		expect(useCaseSpy).toHaveBeenCalled();
	});

	test('should throw if GetRecipesUseCase throws', async () => {
		const { sut, useCase } = makeSut();
		jest.spyOn(useCase, 'execute').mockImplementation(() => {
			throw Error();
		});
		const httpRequest = makeHttpRequest();

		const promise = sut.handle(httpRequest);
		await expect(promise).rejects.toThrow();
	});
});
