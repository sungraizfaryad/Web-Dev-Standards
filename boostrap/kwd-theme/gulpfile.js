const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

function compileSass() {
    return gulp
        .src('resources/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
}

function watchFiles() {
    gulp.watch('resources/scss/**/*.scss', compileSass);
    gulp.watch('**/*.php').on('change', browserSync.reload);
}

function browserSyncInit() {
    browserSync.init({
        //proxy: 'http://yourwebsite.local/',
        notify: false
    });
}

exports.default = gulp.series(compileSass, gulp.parallel(browserSyncInit, watchFiles));
