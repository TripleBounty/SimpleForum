'use strict';

const mongoClient = require('mongodb').MongoClient;
const CONNECTION_URL = require('../config/mongo-db-config/index')
    .connectionString;

const connectionPromise = mongoClient.connect(CONNECTION_URL);

module.exports = connectionPromise;
module.exports = require('./data');
