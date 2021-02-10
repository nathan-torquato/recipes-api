import { app } from './app';
import { validateEnvVars } from './utils';

validateEnvVars();

const PORT = 3000;
const EXPOSED_PORT = process.env.EXPOSED_PORT || PORT;
app.listen(PORT, () =>
	console.log(
		`Server is running... http://localhost:${EXPOSED_PORT}/recipes?i=onion,tomato`,
	),
);
