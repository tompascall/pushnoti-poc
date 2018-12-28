const mysql = require('mysql');
const config = require('../config');

exports.createConnection = () => {
    const connection = mysql.createConnection({
        host: config.get('db.host'),
        user: config.get('db.user'),
        password: config.get('db.password'),
        database: config.get('db.name')
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting ' + err.stack);
            return null;
        }
        console.log('connected as id ' + connection.threadId);
    });
    return connection;
};
