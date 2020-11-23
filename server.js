require('rootpath')();
require('dotenv').config();
const express = require('express');

const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./src/_helpers/jwt');
const errorHandler = require('./src/_helpers/error-handler');

server.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
server.use(bodyParser.json());
server.use(cors());
// use JWT auth to secure the api
server.use(jwt());

// api routes
server.use('/user', require('./src/routes/user.routes'));
server.use('/eth', require('./src/routes/eth.routes'));

// global error handler
server.use(errorHandler);

module.exports = server;
