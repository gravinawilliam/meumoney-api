import { Router } from 'express';
import users from '@modules/users/infra/http/routes/users.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';
import banks from '@modules/banks/infra/http/routes/banks.routes';

const routes = Router();

routes.use('/users', users);
routes.use('/sessions', sessions);
routes.use('/banks', banks);

export default routes;
