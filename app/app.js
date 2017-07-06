const express = require('express');
const app = express();
const data = require('../data');

require('./config/app/app-config')(app);

require('./config/passport/passport-config')(app);
require('../routers')(app, data);

module.exports = app;
