'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/MongoDB-config');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/node_modules', express.static('libs'));

MongoClient.connect(dbConfig.connectionString, (err, db) => {
    if (err) {
        return console.log(err);
    }

    db.collection('users').find().toArray((e, userCollection) => {
        userCollection.forEach((el) => console.log(el));
    });


    // Start the server
    const port = 3000;
    return app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
});

