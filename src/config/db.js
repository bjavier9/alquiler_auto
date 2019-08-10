'user strict';

var mysql = require('mysql');
const CONFIG = require('./config');
//local mysql db connection
var connection = mysql.createConnection({
    host     : CONFIG.db_host,
    user     : CONFIG.db_user,
    password : CONFIG.password,
    database : CONFIG.db_name
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;