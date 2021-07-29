require('dotenv').config();

const stagingConfig = {
    JWT_SECRET: process.env.JWT_SECRET
};

const localConfig = {
    JWT_SECRET: process.env.JWT_SECRET
};

const prodConfig = {
    JWT_SECRET: process.env.JWT_SECRET
};

const defaultConfig = {
    PORT: process.env.NODE_PORT || 3000
};

const freeswitch = {
    ip: process.env.FREESWITCH_IP,
    port: process.env.FREESWITCH_PORT,
    password: process.env.FREESWITCH_PASSWORD
}

function envConfig(env) {
    switch (env) {
        case 'staging':
            return stagingConfig;
        case 'local':
            return localConfig;
        default:
            return prodConfig;
    }
}

export default {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
    ...freeswitch,
    SALTROUNDS: 10
};