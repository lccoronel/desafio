/* eslint-disable max-len */
import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCase/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordMailController();

passwordRoutes.post('/forgot', sendForgotPasswordController.handle);

export { passwordRoutes };
