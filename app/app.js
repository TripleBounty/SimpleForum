module.exports = (data) => {
    const express = require('express');
    const app = express();

    require('./config/app/app-config')(app);
    require('./config/passport/passport-config')(app, data);
    require('../routers')(app, data);

    return Promise.resolve(app);
};
