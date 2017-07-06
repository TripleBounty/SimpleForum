// Simple data to be replaced with mongodb
'use strict';

const mongoClient = require('mongodb').MongoClient;
const CONNECTION_URL = require('../config/mongo-db-config/index')
    .connectionString;

const connectionPromise = mongoClient.connect(CONNECTION_URL);

module.exports = connectionPromise;

const db = {
    users: [
        {
            id: 1,
            username: 'krutz',
            password: '1234',
        },
    ],
};

function findUserById(id) {
    const user = db.users.find((u) => u.id === id);

    return Promise.resolve(user || null);
}

function findUserByCredentials(username, password) {
    const user = db.users.find((u) => u.username === username &&
        u.password === password);

    return Promise.resolve(user || null);
}

module.exports = {
    findUserById,
    findUserByCredentials,
};
