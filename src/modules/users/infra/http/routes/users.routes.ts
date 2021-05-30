import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import createUserValidator from '../validators/createUser';
import deleteUserValidator from '../validators/deleteUser';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', createUserValidator, usersController.create);

usersRouter.delete(
  '/',
  deleteUserValidator,
  ensureAuthenticated,
  usersController.delete,
);

export default usersRouter;
