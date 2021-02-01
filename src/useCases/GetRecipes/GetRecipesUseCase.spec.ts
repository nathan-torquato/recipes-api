import { RecipeProvider, GIFProvider } from '../../providers';
import { makeRecipeProviderStub, makeGIFProviderStub } from '../../test-utils';
import { GetRecipesUseCase } from './GetRecipesUseCase';

interface SutFactory {
	sut: GetRecipesUseCase;
	recipeProvider: RecipeProvider;
	gifProvider: GIFProvider;
}

function makeSut(): SutFactory {
	const recipeProvider = makeRecipeProviderStub();
	const gifProvider = makeGIFProviderStub();
	const sut = new GetRecipesUseCase(recipeProvider, gifProvider);

	return {
		sut,
		recipeProvider,
		gifProvider,
	};
}

describe('GetRecipesUseCase', () => {
	test('should use a RecipeProvider', async () => {
		const { sut, recipeProvider } = makeSut();
		const RecipeProviderSpy = jest.spyOn(recipeProvider, 'getByIngredients');
		await sut.execute([]);

		expect(RecipeProviderSpy).toHaveBeenCalled();
	});

	test('should call RecipeProvider with received ingredients', async () => {
		const { sut, recipeProvider } = makeSut();
		const RecipeProviderSpy = jest.spyOn(recipeProvider, 'getByIngredients');
		const ingredients = ['a', 'b', 'c'];

		await sut.execute(ingredients);
		expect(RecipeProviderSpy).toHaveBeenCalledWith(ingredients);
	});

	test('should throw if RecipeProvider throws', async () => {
		const { sut, recipeProvider } = makeSut();
		jest.spyOn(recipeProvider, 'getByIngredients').mockImplementationOnce(() => {
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
