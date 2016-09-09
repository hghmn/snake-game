'use strict';

const gulp        = require('gulp');
const del         = require('del');


module.exports = () => {
    gulp.task('clean', function() {
        return del([
            'dist/**/*',
            'dist/*',
            'dist',
        ]);
    });
};
