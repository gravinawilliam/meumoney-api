import { Router } from 'express';
import users from '@modules/users/infra/http/routes/users.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';
import banks from '@modules/banks/infra/http/routes/banks.routes';
import coins from '@modules/coins/infra/http/routes/coins.routes';

const routes = Router();

routes.use('/users', users);
routes.use('/sessions', sessions);
routes.use('/banks', banks);
routes.use('/coins', coins);

export default routes;
