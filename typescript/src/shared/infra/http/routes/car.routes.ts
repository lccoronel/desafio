/* eslint-disable max-len */
import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carRoutes.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle);
carRoutes.get('/available', listAvailableCarsController.handle);
carRoutes.post('/specifications/:id', ensureAuthenticate, ensureAdmin, createCarSpecificationController.handle);

export { carRoutes };
