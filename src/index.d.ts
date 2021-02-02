interface Error {
	statusCode: number;
}

declare namespace NodeJS {
	export interface ProcessEnv {
		RECIPE_PUPPY_API_URL: string;
		GIF_PUPPY_API_URL: string;
		GIF_API_KEY: string;
	}
}
