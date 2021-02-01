import { GetRecipeProvider, GIFProvider } from '../../providers';
import { makeGetRecipeProviderStub, makeGIFProviderStub } from '../../test-utils';
import { GetRecipesUseCase } from './GetRecipesUseCase';

interface SutFactory {
	sut: GetRecipesUseCase;
	getRecipeProvider: GetRecipeProvider;
	gifProvider: GIFProvider;
}

function makeSut(): SutFactory {
	const getRecipeProvider = makeGetRecipeProviderStub();
	const gifProvider = makeGIFProviderStub();
	const sut = new GetRecipesUseCase(getRecipeProvider, gifProvider);

	return {
		sut,
		getRecipeProvider,
		gifProvider,
	};
}

describe('GetRecipesUseCase', () => {
	test('should use a GetRecipeProvider', async () => {
		const { sut, getRecipeProvider } = makeSut();
		const getRecipeProviderSpy = jest.spyOn(getRecipeProvider, 'getRecipes');
		await sut.execute([]);

		expect(getRecipeProviderSpy).toHaveBeenCalled();
	});

	test('should call GetRecipeProvider with received ingredients', async () => {
		const { sut, getRecipeProvider } = makeSut();
		const getRecipeProviderSpy = jest.spyOn(getRecipeProvider, 'getRecipes');
		const ingredients = ['a', 'b', 'c'];

		await sut.execute(ingredients);
		expect(getRecipeProviderSpy).toHaveBeenCalledWith(ingredients);
	});

	test('should throw if GetRecipeProvider throws', async () => {
		const { sut, getRecipeProvider } = makeSut();
		jest.spyOn(getRecipeProvider, 'getRecipes').mockImplementationOnce(() => {
			throw Error();
		});

		const promise = sut.execute([]);
		await expect(promise).rejects.toThrow();
	});

	test('should use a GIFProvider', async () => {
		const { sut, gifProvider } = makeSut();
		const gifProviderSpy = jest.spyOn(gifProvider, 'getByKeyword');
		await sut.execute([]);

		expect(gifProviderSpy).toHaveBeenCalled();
	});
});
