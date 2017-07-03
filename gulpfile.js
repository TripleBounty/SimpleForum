const gulp = require('gulp');

gulp.task('server', () => {
    const app = require('./app/index');
    const port = 3000;

    app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
});
