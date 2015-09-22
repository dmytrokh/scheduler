'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
//var ignore = require('gulp-ignore');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src([path.join(conf.paths.src, '/app/**/*.coffee'), '!'+path.join(conf.paths.src, '/app/**/*.spec.coffee')])
//    .pipe(ignore.include(path.join(conf.paths.src, '/app/**/*.spec.coffee')))
    .pipe($.sourcemaps.init())
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter())
    .pipe($.coffee()).on('error', conf.errorHandler('CoffeeScript'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')))
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.size())
});


gulp.task('testscripts', function () {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.spec.coffee'))
    .pipe($.sourcemaps.init())
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter())
    .pipe($.coffee()).on('error', conf.errorHandler('CoffeeScript'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.src, '/tests')))
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.size())
});
