/* eslint-disable max-len */
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarsImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const carRoutes = Router();

const upload = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImageController = new UploadCarsImageController();

carRoutes.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle);
carRoutes.get('/available', listAvailableCarsController.handle);
carRoutes.post('/specifications/:id', ensureAuthenticate, ensureAdmin, createCarSpecificationController.handle);
carRoutes.post(
  '/images/:id',
  ensureAuthenticate,
  ensureAdmin,
  upload.array('images'),
  uploadCarsImageController.handle,
);

export { carRoutes };
