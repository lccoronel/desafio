import { Router } from 'express';

// eslint-disable-next-line max-len
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticate);
specificationsRoutes.use(ensureAdmin);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
