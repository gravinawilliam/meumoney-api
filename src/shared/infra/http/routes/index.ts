import { Router } from 'express';
import users from '@modules/users/infra/http/routes/users.routes';
import passwords from '@modules/users/infra/http/routes/passwords.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';
import profiles from '@modules/users/infra/http/routes/profiles.routes';
import banks from '@modules/banks/infra/http/routes/banks.routes';
import coins from '@modules/coins/infra/http/routes/coins.routes';
import bankAccounts from '@modules/bankAccounts/infra/http/routes/bankAccounts.routes';
import transactions from '@modules/transactions/infra/http/routes/transactions.routes';
import notifications from '@modules/notifications/infra/http/routes/notifications.routes';

const routes = Router();

routes.use('/users', users);
routes.use('/sessions', sessions);
routes.use('/banks', banks);
routes.use('/coins', coins);
routes.use('/bankAccounts', bankAccounts);
routes.use('/transactions', transactions);
routes.use('/profiles', profiles);
routes.use('/passwords', passwords);
routes.use('/notifications', notifications);

export default routes;
