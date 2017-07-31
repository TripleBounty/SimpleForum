const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('server', () => {
    const config = require('./app/config/env-configs/env-configs');
    const bucketConfig = require('./app/config/env-configs/bucket-config');
    const port = config.port;

    Promise.resolve()
        .then(() => require('./db')(config.connectionString))
        .then((db) => require('./data')(db))
        .then((data) => require('./app/index')(data, bucketConfig))
        .then((app) => {
            return Promise.resolve(app.listen(port, () => console.log(`Server is running at http://localhost:${port}`)));
        })
        .then((server) => require('./app/config/socket-io/socket-io')(server));
});

gulp.task('pre-test', () => {
    return gulp.src([
        './app/**/*.js',
        './controllers/**/*.js',
        './data/**/*.js',
        './models/**/*.js',
        './routers/**/*.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src(['./tests/unit/**/*.js', './tests/integration/**/*.js'])
        .pipe(mocha({
            timeout: 5000,
        }))
        .pipe(istanbul.writeReports())
        .once('end', () => {
            // eslint-disable-next-line
            process.exit();
        });
});

gulp.task('test-server-start', () => {
    const config = require('./app/config/env-configs/env-configs');
    const bucketConfig = require('./app/config/env-configs/bucket-config');
    const port = config.port;

    return Promise.resolve()
        .then(() => require('./db')(config.connectionStringTest))
        .then((db) => require('./data')(db))
        .then((data) => require('./app/index')(data, bucketConfig))
        .then((app) => {
            return Promise.resolve(app.listen(port, () => console.log(`Server is running at http://localhost:${port}`)));
        })
        .then((server) => require('./app/config/socket-io/socket-io')(server));
});

const { MongoClient } = require('mongodb');
const country = {
    'name': 'Bulgaria',
    'code': 'BG',
};

gulp.task('init:testdb', () => {
    const config = require('./app/config/env-configs/env-configs');
    return MongoClient.connect(config.connectionStringTest)
        .then((db) => {
            return db.dropDatabase()
                .then(() => {
                    return db.collection('countries').insert(country);
                });
        });
});

gulp.task('test-server:stop', () => {
    gulp.start('init:testdb');
});


gulp.task('tests:browser', ['test-server-start', 'init:testdb'], () => {
    return gulp.src(['./tests/browser/tests/**/*.js'])
        .pipe(mocha({
            timeout: 30000,
        }))
        .once('end', () => {
            gulp.start('test-server:stop');
        });
});
