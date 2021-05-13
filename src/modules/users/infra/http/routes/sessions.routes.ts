import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import createSessionValidator from '../validators/createSession';

const authenticateRouter = Router();
const session = new SessionsController();

authenticateRouter.post('/', createSessionValidator, session.create);

export default authenticateRouter;
