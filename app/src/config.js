const convict = require('convict');

var config = convict({
    env: {
        doc: "The application environment.",
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
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
    pushApiUrl: {
        doc: 'The push server socket address.',
        default: 'localhost:8080',
        env: 'PUSH_API_URL',
    },
    pushServerVapidPublicKey: {
        doc: 'The push server vapid public key',
        default: 'def_vap_pub_key',
        env: 'PUSH_SERVER_VAPID_PUBLIC_KEY',
    },
});

config.validate({ allowed: 'strict' });

module.exports = config;