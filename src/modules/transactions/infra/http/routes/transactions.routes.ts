import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import TransactionsController from '../controllers/TransactionsController';
import UserTransactionsByDateController from '../controllers/UserTransactionsByDateController';
import listTransactionsByDateUserIdValidator from '../validators/ListTransactionsByDateUserId';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();
const userTransactionsByDateController = new UserTransactionsByDateController();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.post('/', transactionsController.create);
transactionsRouter.get(
  '/',
  listTransactionsByDateUserIdValidator,
  userTransactionsByDateController.index,
);

export default transactionsRouter;
