import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCase/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const usersRouter = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRouter.post('/', createUserController.handle);
usersRouter.patch('/avatar', ensureAuthenticate, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export { usersRouter };
