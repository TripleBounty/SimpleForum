const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

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
    return gulp.src('./tests/unit/**/*.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports());
});
