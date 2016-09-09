'use strict';

const gulp      = require('gulp');
const zip       = require('gulp-zip');
const rename    = require('gulp-rename');
const util      = require('gulp-util');
const fs        = require('fs');


module.exports = () => {
    gulp.task('zip', [ 'zip:report' ]);

    gulp.task('zip:index', () => {
        return gulp.src('dist/index.min.html')
            .pipe(rename('index.html'))
            .pipe(zip('game.zip'))
            .pipe(gulp.dest('./dist'));
    });

    gulp.task('zip:report', [ 'zip:index' ], done => {
        fs.stat('./dist/game.zip', (err, data) => {
            if (err) {
                return done(err);
            }
            util.log(util.colors.yellow.bold(`Current game size: ${ data.size } bytes`));
            done();
        });
    });
};
