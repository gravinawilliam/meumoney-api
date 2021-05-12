import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import grantPermission from '@shared/infra/http/middlewares/grantPermission';
import { Router } from 'express';
import BanksController from '../controllers/BanksController';
import createBankValidator from '../validators/createBank';

const banksRouter = Router();
const banksController = new BanksController();

banksRouter.use(ensureAuthenticated);

banksRouter.post(
  '/',
  grantPermission,
  createBankValidator,
  banksController.create,
);

export default banksRouter;
