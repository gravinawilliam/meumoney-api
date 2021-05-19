import uploadConfig from '@config/upload.config';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import grantPermission from '@shared/infra/http/middlewares/grantPermission';
import { Router } from 'express';
import multer from 'multer';
import BankLogoController from '../controllers/BankLogoController';
import BanksController from '../controllers/BanksController';
import createBankValidator from '../validators/createBank';
import updateBankLogoValidator from '../validators/updateBankLogo';

const upload = multer(uploadConfig.multer);
const banksRouter = Router();
const banksController = new BanksController();
const bankLogo = new BankLogoController();

banksRouter.use(ensureAuthenticated);

banksRouter.get('/', banksController.index);

banksRouter.patch(
  '/logo',
  ensureAuthenticated,
  updateBankLogoValidator,
  upload.single('logo'),
  bankLogo.update,
);

banksRouter.post(
  '/',
  grantPermission,
  createBankValidator,
  banksController.create,
);

export default banksRouter;
