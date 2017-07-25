const gulp = require('gulp');

gulp.task('server', () => {
    const config = require('./app/config/env-configs/env-configs');
    const port = config.port;

    Promise.resolve()
        .then(() => require('./db')(config.connectionString))
        .then((db) => require('./data')(db))
        .then((data) => require('./app/index')(data))
        .then((app) => {
            return Promise.resolve(app.listen(port, () => console.log(`Server is running at http://localhost:${port}`)));
        })
        .then((server) => require('./app/config/socket-io/socket-io')(server));
});
