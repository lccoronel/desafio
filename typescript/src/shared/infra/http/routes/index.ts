import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carRoutes } from './car.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRouter);
router.use('/sessions', authenticateRoutes);
router.use('/cars', carRoutes);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRoutes);

export { router };
