const app = require('./app/index');

// Start the server
const port = 3000;

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

// MongoClient.connect(dbConfig.connectionString, (err, db) => {
//     if (err) {
//         return console.log(err);
//     }

//     db.collection('users').find().toArray((e, userCollection) => {
//         userCollection.forEach((el) => console.log(el));
//     });

//     const controlles = require('./routers/server-routes')(app, db);

//     // Start the server
//     const port = 3000;

//     return app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
// });

