import { Router } from 'express';
import AuthRoutes from './auth.route';

const routes = new Router();

routes.use('/', AuthRoutes);

export default routes;