import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import grantPermission from '@shared/infra/http/middlewares/grantPermission';
import { Router } from 'express';
import CoinsController from '../controllers/CoinsController';

const coinsRouter = Router();
const coinsController = new CoinsController();

coinsRouter.use(ensureAuthenticated);

coinsRouter.post('/', grantPermission, coinsController.create);

export default coinsRouter;
