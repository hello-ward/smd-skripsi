import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import passport from 'passport';
import expressWinston from 'express-winston';
import helmet from 'helmet';
import cors from 'cors';

import {db} from './db';
import winstonInstance from './winston';

export default app => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  require('./passport');
  app.use(helmet());
  app.use(cors());
  db();
  if (process.env.NODE_ENV == 'local' || process.env.NODE_ENV == 'staging') {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg:
          'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true,
      }),
    );
  }
};