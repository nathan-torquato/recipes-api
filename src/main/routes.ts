/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { expressRouteAdapter } from './adapters';
import { makeGetRecipesController } from './factories';

const router = Router();

router.get('/recipes', expressRouteAdapter(makeGetRecipesController()));

export { router };
