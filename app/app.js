const express = require('express');
const app = express();
const data = require('../data');

require('./config/app.config')(app);

require('../routers')(app, data);

module.exports = app;
