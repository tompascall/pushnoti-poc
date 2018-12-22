const convict = require('convict');

// Define a schema
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
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: 'db',
            env: 'DB_HOST'
        },
        name: {
            doc: 'Database name',
            format: String,
            default: 'database',
            env: 'DB_NAME'
        },
        user: {
            doc: 'Database username',
            format: String,
            default: 'root',
            env: 'DB_USER'
        },
        password: {
            doc: 'Database password',
            format: String,
            default: 'password',
            env: 'DB_PASSWORD'
        }
    },
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;