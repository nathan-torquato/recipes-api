import { Router } from 'express';
import { adaptRoute } from './adapters';
import { makeGetRecipesController } from './factories';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', adaptRoute(makeGetRecipesController()));

export { router };
