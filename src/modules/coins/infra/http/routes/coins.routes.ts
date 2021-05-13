import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import grantPermission from '@shared/infra/http/middlewares/grantPermission';
import { Router } from 'express';
import CoinsController from '../controllers/CoinsController';
import createCoinValidator from '../validators/createCoin';

const coinsRouter = Router();
const coinsController = new CoinsController();

coinsRouter.use(ensureAuthenticated);

coinsRouter.post(
  '/',
  grantPermission,
  createCoinValidator,
  coinsController.create,
);

export default coinsRouter;
