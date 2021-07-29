import express from 'express';
import chalk from 'chalk';

import middlewaresConfig from './config/middlewares';
import constants from './config/constants';
import Routes from './routes';
import FreeswitchApi from './lib/freeswitch';

const execute = (uuid, variable) => new Promise((resolve, reject) => {
    FreeswitchApi.execute(`uuid_getvar ${uuid} ${variable}`)
        .then(value => {
            resolve(value);
        })
        .catch(error => {
            reject(error);
        });
});
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