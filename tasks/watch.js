'use strict';

// TODO: implement for real

const gulp = require('gulp');
const livereload  = require('gulp-livereload');

module.exports = () => {
    gulp.task('watch', () => {
        livereload.listen();
        return gulp.watch([
            'src/**/*.ts',
            'src/stylesheets/**/*.css',
            'src/templates/**/*.html'
        ], [
            'build',
            'css',
            'template',
            'zip'
        ]);
    });
};
