const mysql = require('mysql');
const config = require('../config');

function DataBaseHandler() {
    this.connection = null;
}

DataBaseHandler.prototype.createConnection = function () {

    this.connection = mysql.createConnection({
        host: config.get('db.host'),
        user: config.get('db.user'),
        password: config.get('db.password'),
        database: config.get('db.name')
    });

    this.connection.connect(function (err) {
        if (err) {
            console.error('error connecting ' + err.stack);
            return null;
        }
        console.log('connected as id ' + this.threadId);
    });
    return this.connection;
};

module.exports = DataBaseHandler;