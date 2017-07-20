module.exports = (data) => {
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
    require('../routers')(app, data);

    return Promise.resolve(app);
};
