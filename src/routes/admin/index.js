import { Router } from 'express';
import AdminRoutes from './admin.route';
import EmployeeRoutes from './employee.route';

const routes = new Router();

routes.use('/', AdminRoutes);
routes.use('/employee', EmployeeRoutes);

export default routes;