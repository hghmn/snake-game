'use strict';

const gulp        = require('gulp');
const concat      = require('gulp-concat-css');
const cleanCSS    = require('gulp-clean-css');
const rename      = require('gulp-rename');
const buffer      = require('vinyl-buffer');
const srcmaps     = require('gulp-sourcemaps');
const livereload  = require('gulp-livereload');


module.exports = () => {
    gulp.task('css', [ 'css:min' ]);

    gulp.task('css:full', () => {
        return gulp.src([
                'src/stylesheets/reset.css', // must come first
                'src/stylesheets/**/*.css'
            ])
            .pipe(concat('styles.css'))
            .pipe(buffer())
            .pipe(srcmaps.init({
                loadMaps: true
            }))
            .pipe(srcmaps.write('./'))
            .pipe(gulp.dest('./dist'));
            // .pipe(livereload());
    });

    // Minification
    gulp.task('css:min', [ 'css:full' ], () => {
        return gulp.src('./dist/styles.css')
            .pipe(cleanCSS())
            .pipe(rename('styles.min.css'))
            .pipe(gulp.dest('./dist'));
    });
};
