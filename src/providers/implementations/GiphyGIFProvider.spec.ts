import axios, { AxiosResponse } from 'axios';
import { NotImplemented } from '../../errors';
import { GIFResponse, GiphyGIFProvider } from './GiphyGIFProvider';

interface SutFactory {
	sut: GiphyGIFProvider;
}

function makeSut(): SutFactory {
	const sut = new GiphyGIFProvider();

	return {
		sut,
	};
}

async function getMockedResponse(): Promise<AxiosResponse<GIFResponse>> {
	return {
		config: {},
		headers: {},
		status: 200,
		statusText: '',
		data: {
			data: [
				{
					id: 'random-text',
					images: {
						original: {
							height: '600',
							width: '600',
							size: '43487171',
							url: 'https://media2.giphy.com/id.gif',
						},
					},
				},
			],
		},
	};
}

describe('GiphyGIFProvider', () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should use axios to make a GET Request', async () => {
		const { sut } = makeSut();
		const axiosSpy = jest.spyOn(axios, 'get').mockReturnValue(getMockedResponse());
		await sut.getByKeyword(['A great recipe', 'Another amazng one']);

		expect(axiosSpy).toHaveBeenCalled();
	});

	test('should call API with correct config', async () => {
		const { sut } = makeSut();
		const axiosSpy = jest.spyOn(axios, 'get').mockReturnValue(getMockedResponse());
		const keywords = ['A great recipe', 'Another amazng one'];
		await sut.getByKeyword(keywords);

		const URL = process.env.GIF_PUPPY_API_URL;
		const API_KEY = process.env.GIF_API_KEY;
		expect(axiosSpy).toHaveBeenLastCalledWith(URL, {
			params: {
				api_key: API_KEY,
				limit: 1,
				q: keywords[1],
			},
		});
	});

	test('should throw SystemException if API response does not match expected schema', async () => {
		jest.spyOn(axios, 'get').mockReturnValue(
			Promise.resolve({
				data: {
					gifs: [],
				},
			}),
		);
		const { sut } = makeSut();

		const promise = sut.getByKeyword(['Recipe 1', 'Recipe 2']);
		await expect(promise).rejects.toThrow(NotImplemented);
	});

	test('should throw SystemException if recipe object in API response does not match expected schema', async () => {
		jest.spyOn(axios, 'get').mockReturnValue(
			Promise.resolve({
				data: {
					data: [
						{
							imageList: {},
						},
					],
				},
			}),
		);
		const { sut } = makeSut();

		const promise = sut.getByKeyword(['onions', 'orange']);
		await expect(promise).rejects.toThrow(NotImplemented);
	});
});
