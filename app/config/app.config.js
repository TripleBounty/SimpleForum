'use strict';
/* globals __dirname */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbConfig = require('../../config/MongoDB-config');
const MongoClient = require('mongodb').MongoClient;

const appConfig = (app) => {
    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/libs', express.static(path.join(__dirname, '../../node_modules')));
    app.use('/static', express.static(path.join(__dirname, '../../static')));
};

module.exports = appConfig;
