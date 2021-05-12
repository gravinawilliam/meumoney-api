import { Router } from 'express';
import users from '@modules/users/infra/http/routes/users.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
