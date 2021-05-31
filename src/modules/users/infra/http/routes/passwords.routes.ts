import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import forgotPasswordValidator from '../validators/forgotPassword';

const passwordsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordsRouter.post(
  '/forgot',
  forgotPasswordValidator,
  forgotPasswordController.create,
);

export default passwordsRouter;
