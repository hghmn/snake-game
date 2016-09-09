'use strict';

const gulp        = require('gulp');
const nunjucks    = require('gulp-nunjucks');
const fs          = require('fs');
const merge       = require('merge-stream');

// Import the config from the root
const config      = require('../template.config');

function readFile(fname) {
    return new Promise((resolve, reject) => {
        fs.readFile(fname, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data.toString('utf8'));
        });
    });
}


module.exports = () => {
    gulp.task('template', [ 'build', 'css' ], done => {
        Promise.all([
            readFile('./dist/bundle.min.js'),
            readFile('./dist/styles.min.css')])
            .then(values => {
                // full template
                var full = gulp.src('./src/templates/index.html')
                    .pipe(nunjucks.compile(config))
                    .pipe(gulp.dest('./dist'));

                // minified template
                // var minimal = gulp.src('./src/templates/index.min.html')
                //     .pipe(nunjucks.compile({
                //         title: 'Escape Velocity',
                //         scripts: values[0],
                //         styles: values[1],
                //     }))
                //     .pipe(gulp.dest('./dist'));
                // return merge(full, minimal);

                return full;
            })
            .then(
                () => done(),
                err => done(err));
    });
};
