import axios from 'axios';
import { RecipePuppyRecipeProvider } from './RecipePuppyRecipeProvider';

interface SutFactory {
	sut: RecipePuppyRecipeProvider;
}

function makeSut(): SutFactory {
	const sut = new RecipePuppyRecipeProvider();

	return {
		sut,
	};
}

describe('RecipePuppyRecipeProvider', () => {
	test('should use axios to make a GET Request', async () => {
		const { sut } = makeSut();
		const axiosSpy = jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({}));
		await sut.getByIngredients(['onion']);
		expect(axiosSpy).toHaveBeenCalledTimes(1);
	});
});
