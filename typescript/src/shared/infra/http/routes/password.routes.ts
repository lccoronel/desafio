/* eslint-disable max-len */
import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCase/sendForgotPasswordMail/SendForgotPasswordMailController';
import { ResetPasswordController } from '@modules/accounts/useCase/resetPassword/ResetPasswordController';

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
