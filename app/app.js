const express = require('express');
const app = express();
require('./config/app.config')(app);

require('../routers')(app);

module.exports = app;
