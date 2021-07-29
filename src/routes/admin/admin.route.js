import { Router } from 'express';
import AdminController from '../../controllers/app/admin/admin.controller';

const router = Router();

router.get('/profile', AdminController.getProfile);

export default router;