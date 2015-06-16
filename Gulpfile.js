'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var exec = require('child_process').exec;
var del = require('del');
var shell = require('gulp-shell');

var scssPath = './src/assets/stylesheets/**/*.scss';
var destPath = './dest/assets/css';

//clean build folder
gulp.task('clean:build', function(cb) {
  del(['./dest'], cb);
});

//Compile SCSS 
gulp.task('sass', function () {
  return gulp.src(scssPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destPath));
});

//Watch SCSS 
gulp.task('sass:watch', function () {
  return gulp.watch(scssPath, ['sass']);
});

//Create styleguide
gulp.task('styleguide:create', ['clean:build'], shell.task([
    "mkdir dest",
    "./node_modules/.bin/kss-node --config ./kss-config.json"
  ])
);



gulp.task('default', ['styleguide:create', 'sass']);