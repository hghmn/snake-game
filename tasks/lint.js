'use strict';

const gulp        = require('gulp');
const tslint      = require('gulp-tslint');


module.exports = () => {
    gulp.task('tslint', () =>
        gulp.src('src/**/*.ts')
            .pipe(tslint({
                configuration: './tslint.json',
                formatter: 'verbose',
            }))
            .pipe(tslint.report())
    );
};

