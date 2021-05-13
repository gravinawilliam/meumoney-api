import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import createUserValidator from '../validators/createUser';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', createUserValidator, usersController.create);

export default usersRouter;
