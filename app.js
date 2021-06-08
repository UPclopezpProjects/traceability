'use stric'

global.host = {
  api_gateway: '0.0.0.0',
  aws: '52.202.214.13'
};
global.port = {
  api_gateway: '80',
  aws: '80'
};
global.path = {
  images: '/images?id='
};

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//New
var logger = require('morgan');
//New

var app = express();

//Cargar rutas
//var user_routes = require('./routes/user');
var traceability = require('./routes/index');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//New
app.use(logger('dev'));
//New

//Configurar cabeceras HTTP y cors
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Carga de rutas base
app.use('/', traceability);

module.exports = app;
