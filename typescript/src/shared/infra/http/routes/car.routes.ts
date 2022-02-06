import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle);

export { carRoutes };
