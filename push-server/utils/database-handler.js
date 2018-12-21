const mysql = require('mysql');

function DataBaseHandler() {
    this.connection = null;
}

DataBaseHandler.prototype.createConnection = function () {

    this.connection = mysql.createConnection({
        host: 'db',
        user: 'root',
        password: '123',
        database: 'pn',
	    port: 3306
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