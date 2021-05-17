import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import BankAccountsController from '../controllers/BankAccountsController';
import createBankAccountValidator from '../validators/createBankAccount';

const bankAccountsRouter = Router();
const bankAccountsController = new BankAccountsController();

bankAccountsRouter.use(ensureAuthenticated);

bankAccountsRouter.post(
  '/',
  createBankAccountValidator,
  bankAccountsController.create,
);

export default bankAccountsRouter;
