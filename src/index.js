
var express = require ('express');
const CONFIG = require('./config/config');
var cors = require('cors')
bodyParser = require('body-parser');
app = express(),
port = CONFIG.port
app.listen (port);
console.log ('El servidor API RESTful:' + port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./rutas/appRutas'); //importo las rutas
routes(app); //registro las rutas
// exporto mi servicio de passport
require('./helper/auth.service')  


  



