const convict = require('convict');

var config = convict({
    env: {
        doc: "The application environment.",
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    pushServerPort: {
        doc: 'The port to bind.',
        format: 'port',
        default: 8080,
        env: 'PUSH_SERVER_PORT',
    },
    pushServerHost: {
        doc: 'The host to bind.',
        default: '0.0.0.0',
        env: 'PUSH_SERVER_HOST',
    },
    appServerPort: {
        doc: 'The port to bind.',
        format: 'port',
        default: 8081,
        env: 'APP_SERVER_PORT',
    },
    appServerHost: {
        doc: 'The host to bind.',
        default: '0.0.0.0',
        env: 'APP_SERVER_HOST',
    },
});

config.validate({ allowed: 'strict' });

module.exports = config;