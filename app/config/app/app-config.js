/* globals __dirname */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const appConfig = (app) => {
    app.set('view engine', 'pug');

    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

    app.use(cookieParser());
    app.use(session({ secret: 'purple unicorn' }));

    app.use('/libs',
        express.static(path.join(__dirname, '../../../node_modules')));
    app.use('/static', express.static(path.join(__dirname, '../../../static')));
};

module.exports = appConfig;
