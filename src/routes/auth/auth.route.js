import { Router } from 'express';
import AuthController from '../../controllers/auth/auth.controller';

const router = Router();

router.post('/login', AuthController.userLogin);

export default router;