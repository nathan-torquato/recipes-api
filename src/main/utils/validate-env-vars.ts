import dotenv from 'dotenv';

dotenv.config();

export function validateEnvVars(): void {
	const requiredEnvVars = [
		'RECIPE_PUPPY_API_URL',
		'GIF_PUPPY_API_URL',
		'GIF_API_KEY',
		'GIF_NOT_FOUND_URL',
	];

	requiredEnvVars.forEach(envVar => {
		if (!process.env[envVar]) {
			throw new Error(`Environment var ${envVar} is required!`);
		}
	});
}
