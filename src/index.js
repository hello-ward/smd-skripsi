import express from 'express';
import chalk from 'chalk';

import middlewaresConfig from './config/middlewares';
import constants from './config/constants';
import Routes from './routes';

const app = express();

middlewaresConfig(app);

app.use('/', Routes);

if (!module.parent) {
    app.listen(constants.PORT, err => {
        if (err) {
            console.log(chalk.red('Cannot run!'));
        } else {
            console.log(
                chalk.green.bold(
                    `
        Yep this is working 🍺
        App listen on port: ${constants.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `,
                ),
            );
        }
    });
}

export default app;