import { Router } from 'express';
import GpsController from '../../controllers/app/marketing/gps.controller';

const router = Router();

router.post('/start', GpsController.start);
router.post('/stop', GpsController.stop);
router.post('/update-location', GpsController.updateLocation);

export default router;