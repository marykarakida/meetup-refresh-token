import { Router } from 'express';

import * as authController from '../controllers/authController';
import validateSchema from '../middlewares/validateSchemaMiddleware';

const router = Router();

router.post('/register', validateSchema('newUserSchema'), authController.register);
router.post('/login', validateSchema('userSchema'), authController.login);
router.get('/refresh', authController.refresh);
router.get('/logout', authController.logout);

export default router;
