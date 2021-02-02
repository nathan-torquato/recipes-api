import axios, { AxiosResponse } from 'axios';
import { NotImplemented } from '../../src/errors';
import { RawRecipe } from '../../src/protocols';
import { RecipePuppyRecipeProvider } from '../../src/providers/implementations/RecipePuppyRecipeProvider';

interface SutFactory {
	sut: RecipePuppyRecipeProvider;
}

function makeSut(): SutFactory {
	const sut = new RecipePuppyRecipeProvider();

	return {
		sut,
	};
}

async function getMockedResponse(): Promise<AxiosResponse<{ results: RawRecipe[] }>> {
	return {
		config: {},
		headers: {},
		status: 200,
		statusText: '',
		data: {
			results: [
				{
					href: 'href',
					ingredients: 'ingredients',
					thumbnail: 'thumbnail',
					title: 'title',
				},
			],
		},
	};
}

describe('RecipePuppyRecipeProvider', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should use axios to make a GET Request', async () => {
		const { sut } = makeSut();
		const axiosSpy = jest.spyOn(axios, 'get').mockReturnValueOnce(getMockedResponse());
		await sut.getByIngredients(['onion']);

		expect(axiosSpy).toHaveBeenCalled();
	});

	test('should include the received list of ingredients as a query param of the API GET request', async () => {
		const axiosSpy = jest.spyOn(axios, 'get').mockReturnValue(getMockedResponse());
		const { sut } = makeSut();
		await sut.getByIngredients(['onions', 'orange']);

		const API_URL = process.env.RECIPE_PUPPY_API_URL;
		expect(axiosSpy).toHaveBeenCalledWith(API_URL, {
			params: {
				i: 'onions,orange',
			},
		});
	});

	test('should throw SystemException if API response does not match expected schema', async () => {
		jest.spyOn(axios, 'get').mockReturnValue(
			Promise.resolve({
				data: {
					recipeList: [],
				},
			}),
		);
		const { sut } = makeSut();

		const promise = sut.getByIngredients(['onions', 'orange']);
		await expect(promise).rejects.toThrow(NotImplemented);
	});

	test('should throw SystemException if recipe object in API response does not match expected schema', async () => {
		jest.spyOn(axios, 'get').mockReturnValue(
			Promise.resolve({
				data: {
					results: [
						{
							name: 'some recipe name',
						},
					],
				},
			}),
		);
		const { sut } = makeSut();

		const promise = sut.getByIngredients(['onions', 'orange']);
		await expect(promise).rejects.toThrow(NotImplemented);
	});

	test('should return the data as-is from API response', async () => {
		jest.spyOn(axios, 'get').mockReturnValue(getMockedResponse());
		const { sut } = makeSut();

		const recipes = await sut.getByIngredients(['onions', 'orange']);
		const { data } = await getMockedResponse();
		expect(recipes).toEqual(data.results);
	});
});
