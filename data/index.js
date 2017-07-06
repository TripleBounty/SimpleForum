'use strict';

const mongoClient = require('mongodb').mongoClient;
const CONNECTION_URL = require('../config/mongo-db-config/index')
    .connectionString;

const connectionPromise = mongoClient.connect(CONNECTION_URL);

module.exports = connectionPromise;
