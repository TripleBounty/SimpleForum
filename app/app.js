module.exports = (data, optionalConfig) => {
    const express = require('express');
    const app = express();

    const cookieParser = require('cookie-parser');

    app.use(cookieParser());

    app.get('/removeCookie', function(req, resp) {
        resp.clearCookie('27d');
        resp.end('prucs');
    });

    require('./config/app/app-config')(app);
    require('./config/passport/passport-config')(app, data);

    const controllers = require('../controllers')(data, optionalConfig);
    require('../routers')(app, controllers);

    return Promise.resolve(app);
};
