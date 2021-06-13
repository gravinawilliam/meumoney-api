import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import TransactionsController from '../controllers/TransactionsController';
import UserTransactionsByDateController from '../controllers/UserTransactionsByDateController';
import listTransactionsByDateUserIdValidator from '../validators/ListTransactionsByDateUserId';
import createTransactionValidator from '../validators/CreateTransaction';
import updateTransactionValidator from '../validators/UpdateTransactionValidator';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();
const userTransactionsByDateController = new UserTransactionsByDateController();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.post(
  '/',
  createTransactionValidator,
  transactionsController.create,
);

transactionsRouter.get(
  '/',
  listTransactionsByDateUserIdValidator,
  userTransactionsByDateController.index,
);

transactionsRouter.delete('/:transactionId', transactionsController.delete);

transactionsRouter.put(
  '/:transactionId',
  updateTransactionValidator,
  transactionsController.update,
);

export default transactionsRouter;
