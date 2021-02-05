import { Router } from 'express';

import AuthRoutes from './auth';
import AdminRoutes from './admin';
import DriverRoutes from './driver';
import MarketingRoutes from './marketing';
import { adminJwt, driverJwt, marketingJwt } from '../config/passport';

const routes = new Router();

routes.use('/auth', AuthRoutes);
routes.use('/admin', adminJwt, AdminRoutes);
routes.use('/driver', driverJwt, DriverRoutes);
routes.use('/marketing', marketingJwt, MarketingRoutes);

routes.get('/', (req, res, next) => {
    return res.json('Services is running!');
});

routes.all('*', (req, res, next) => {
    return res.status(404).json('Route not found!!');

});

export default routes;