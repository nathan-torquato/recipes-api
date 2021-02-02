import { RawRecipe, Recipe } from '../../../src/protocols';
import { RecipeProvider, GIFProvider } from '../../../src/providers';
import { makeRecipeProviderStub, makeGIFProviderStub } from '../../test-utils';
import { GetRecipesUseCase } from '../../../src/useCases/GetRecipes/GetRecipesUseCase';

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

	test('should throw if GIFProvider throws', async () => {
		const { sut, gifProvider } = makeSut();
		jest.spyOn(gifProvider, 'getByKeyword').mockImplementationOnce(() => {
			throw Error();
		});

		const promise = sut.execute([]);
		await expect(promise).rejects.toThrow();
	});

	test('should return a list of Recipes when receives valid input and providers return data', async () => {
		const { sut, gifProvider, recipeProvider } = makeSut();
		const mockedRawRecipe: RawRecipe = {
			title: 'A recipe',
			ingredients: 'egg, onion',
			href: 'https://google.com',
			thumbnail: 'https://google.com/thumbnail.png',
		};

		jest
			.spyOn(recipeProvider, 'getByIngredients')
			.mockReturnValueOnce(Promise.resolve([mockedRawRecipe]));

		const mockedTitle = mockedRawRecipe.title;
		const mockedGIFLink = 'https://gif.com/mocked';
		const mockedGIFLinkByTitle: Record<string, string> = {
			[mockedTitle]: mockedGIFLink,
		};

		jest
			.spyOn(gifProvider, 'getByKeyword')
			.mockReturnValueOnce(Promise.resolve(mockedGIFLinkByTitle));

		const ingredients = ['egg', 'onion'];
		const { keywords, recipes } = await sut.execute(ingredients);
		const [recipe] = recipes;
		expect(recipe).toBeDefined();

		const mockedRecipe: Recipe = {
			title: 'A recipe',
			ingredients: ['egg', 'onion'],
			link: 'https://google.com',
			gif: mockedGIFLink,
		};

		expect(recipe).toMatchObject(mockedRecipe);
		mockedRawRecipe.ingredients.split(', ').forEach(ingredient => {
			expect(mockedRecipe.ingredients).toContain(ingredient);
		});

		expect(keywords).toBe(ingredients);
	});
});
