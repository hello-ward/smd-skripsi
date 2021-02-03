import { Router } from 'express';

import AuthRoutes from './auth';
// import { userJwt } from '../config/passport';

const routes = new Router();

routes.use('/auth', AuthRoutes);

routes.get('/', (req, res, next) => {
    return res.json('Services is running!');
});

routes.all('*', (req, res, next) => {
    return res.status(404).json('Route not found!!');

});

export default routes;