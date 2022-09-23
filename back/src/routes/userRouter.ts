import { Router } from 'express';

import * as userController from '../controllers/userController';
import validateToken from '../middlewares/validateTokenMiddleware';

const router = Router();

router.get('/me', validateToken, userController.getUserById);

export default router;
