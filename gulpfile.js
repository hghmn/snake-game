'use strict';

const gulp        = require('gulp');

// TODO: make livereload work for real
// const livereload  = require('gulp-livereload');
// livereload.listen();

// Bootstrap individual task files
[ 'clean', 'lint', 'build', 'css', 'template', /* 'watch', */ 'zip' ]
    .forEach( task => require(`./tasks/${ task }`)() );

gulp.task( 'default', [ 'clean', 'build', 'css', 'template' ] );
