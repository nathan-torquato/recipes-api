import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const requiredEnvVars = ['RECIPE_PUPPY_API_URL', 'GIF_PUPPY_API_URL', 'GIF_API_KEY'];

requiredEnvVars.forEach(envVar => {
	if (!process.env[envVar]) {
		throw new Error(`Environment var ${envVar} is required!`);
	}
});

const PORT = 3000;
app.listen(PORT, () =>
	console.log(`Server is running on http://localhost:${PORT}/recipes?i=onion,tomato`),
);
