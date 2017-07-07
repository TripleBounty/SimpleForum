const mongoClient = require('mongodb').MongoClient;

module.exports = (connectionString) => {
    return mongoClient.connect(connectionString);
};
