import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profile = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profile.show);

export default profileRouter;
