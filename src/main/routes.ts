import { Router } from 'express';
import { expressRouteAdapter } from './adapters';
import { makeGetRecipesController } from './factories';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', expressRouteAdapter(makeGetRecipesController()));

export { router };
