'use strict';

const gulp        = require('gulp');
const rollup      = require('rollup-stream');
const srcmaps     = require('gulp-sourcemaps');
const uglify      = require('gulp-uglify');
const buffer      = require('vinyl-buffer');
const source      = require('vinyl-source-stream');
const rename      = require('gulp-rename');
const livereload  = require('gulp-livereload');


module.exports = () => {
    gulp.task('build', [ 'build:min' ]);

    // Rollup from main.ts
    gulp.task('build:full', [ 'clean' ], () => {
        return rollup('rollup.config.js')
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(srcmaps.init({
                loadMaps: true
            }))
            .pipe(srcmaps.write('./'))
            .pipe(gulp.dest('./dist'));
            // .pipe(livereload({}));
    });

    // Uglification
    gulp.task('build:min', [ 'build:full' ], () => {
        return gulp.src('./dist/bundle.js')
            .pipe(uglify())
            .pipe(rename('bundle.min.js'))
            .pipe(gulp.dest('./dist'));
    });
};
