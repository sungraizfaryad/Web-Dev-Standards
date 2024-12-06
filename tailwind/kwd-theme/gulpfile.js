const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

// Compile SCSS into CSS
function compileSass() {
    return gulp
        .src('resources/scss/**/*.scss') // Source SCSS
        .pipe(sass().on('error', sass.logError)) // Compile SCSS
        .pipe(postcss([autoprefixer()])) // Add vendor prefixes
        .pipe(gulp.dest('assets/css')) // Destination for compiled CSS
        .pipe(browserSync.stream()); // Inject CSS into browser
}

// Watch for changes in SCSS and PHP files
function watchFiles() {
    gulp.watch('resources/scss/**/*.scss', compileSass); // Watch SCSS
    gulp.watch('**/*.php').on('change', browserSync.reload); // Watch PHP
}

// Initialize BrowserSync
function browserSyncInit() {
    browserSync.init({
        notify: false
    });
}

// Default task (run `gulp` or `npm run watch`)
exports.default = gulp.series(compileSass, gulp.parallel(browserSyncInit, watchFiles));

// Compile task (run `gulp compileSass` or `npm run compile`)
exports.compileSass = compileSass;
