// Simple data to be replaced with mongodb
'use strict';

// const mongoClient = require('mongodb').MongoClient;
// const CONNECTION_URL = require('../config/mongo-db-config/index')
//     .connectionString;

// const connectionPromise = mongoClient.connect(CONNECTION_URL);

// module.exports = connectionPromise;

const db = {
    users: [
        {
            id: 1,
            username: 'krutz',
            password: '1234',
        },
    ],
    posts: [
        {
            id: 150,
            username: 'mitku',
            title: 'I am not a bear',
            content: 'mitkoooo mitko',
            img: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Yo_350x350.jpg',
        },
        {
            id: 151,
            username: 'petku',
            title: 'I am a bear',
            content: 'petkoooo mitko',
            img: 'http://www.ghsspml.school/downloads/Syllabus_1478181757.jpg',
        },
    ],
};

function findUserById(id) {
    const user = db.users.find((u) => u.id === id);

    return Promise.resolve(user || null);
}

function findPostById(id) {
    const post = db.posts.find((p) => p.id === id);

    return Promise.resolve(post || null);
}

function findUserByCredentials(username, password) {
    const user = db.users.find((u) => u.username === username &&
        u.password === password);

    return Promise.resolve(user || null);
}

function getAllPosts() {
    return Promise.resolve(db.posts || null);
}

module.exports = {
    findPostById,
    findUserById,
    findUserByCredentials,
    getAllPosts,
};
