import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import BankAccountsController from '../controllers/BankAccountsController';
import createBankAccountValidator from '../validators/createBankAccount';
import deleteBankAccountValidator from '../validators/deleteBankAccount';

const bankAccountsRouter = Router();
const bankAccountsController = new BankAccountsController();

bankAccountsRouter.use(ensureAuthenticated);

bankAccountsRouter.post(
  '/',
  createBankAccountValidator,
  bankAccountsController.create,
);

bankAccountsRouter.get('/', bankAccountsController.index);

bankAccountsRouter.delete(
  '/:bankAccountId',
  deleteBankAccountValidator,
  bankAccountsController.delete,
);

export default bankAccountsRouter;
