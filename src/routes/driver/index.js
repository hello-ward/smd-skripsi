import { Router } from 'express';
import GpsRoutes from './gps.route';

const routes = new Router();

routes.use('/gps', GpsRoutes);

export default routes;