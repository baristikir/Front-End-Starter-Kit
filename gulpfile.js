const gulp = require('gulp');
const scss = require('gulp-sass');
const uglifycss = require('gulp-uglifycss')

// * Creating with `gulp sass` the main.css from the .scss files * //
gulp.task("sass", () => {
    return gulp.src(
        './src/styles/main.scss'
    ).pipe(scss(
        {"bundleExec": true}
    )).pipe(gulp.dest("./build/css"));
});

// * Minifying the created `main.css` too `main.min.css`* //
gulp.task('css', done => {
    gulp.src('./build/css/*.css')
      .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
      }))
      .pipe(gulp.dest('./build/css/dist'));
    done();
});

// * Calling Both Tasks with `run` * //
gulp.task('run', gulp.series('sass', 'css'), done => {
    done();
});
// * Watch Task on the Directories for any changes * //
gulp.task('watch', function(){
    gulp.watch('./src/styles', gulp.series('sass'));
    gulp.watch('./buld/css/*.css', gulp.series('css'));
});
// * Combining Everything together and use it with `gulp` * //
// * It will stay right in the terminal to watch updates  * //
gulp.task('default', gulp.series('run', 'watch'), done => {
    done();
});