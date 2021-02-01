import { GetRecipeProvider } from '../../providers';
import { makeGetRecipeProviderStub } from '../../test-utils';
import { GetRecipesUseCase } from './GetRecipesUseCase';

interface SutFactory {
	sut: GetRecipesUseCase;
	getRecipeProvider: GetRecipeProvider;
}

function makeSut(): SutFactory {
	const getRecipeProvider = makeGetRecipeProviderStub();
	const sut = new GetRecipesUseCase(getRecipeProvider);

	return {
		sut,
		getRecipeProvider,
	};
}

describe('GetRecipesUseCase', () => {
	test('should use a GetRecipeProvider', async () => {
		const { sut, getRecipeProvider } = makeSut();
		const getRecipeProviderSpy = jest.spyOn(getRecipeProvider, 'getRecipes');
		await sut.execute([]);

		expect(getRecipeProviderSpy).toHaveBeenCalled();
	});
});
