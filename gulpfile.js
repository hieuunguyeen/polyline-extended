'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sequence = require('gulp-sequence');

gulp.task('eslint', () => {
  return gulp.src(['src/*.js', 'test/*.js', 'gulpfile.js', 'index.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('mocha', () => {
  return gulp.src('test/index.js', { read: false, timeout: 5000 })
    .pipe(mocha());
});

gulp.task('validate', ['eslint']);
gulp.task('test', sequence('validate', 'mocha'));
gulp.task('default', ['test'])
