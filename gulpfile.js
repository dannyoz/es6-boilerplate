'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babelify = require("babelify");
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var server = require('gulp-express');
var swig = require('gulp-swig');

gulp.task('server', function () {
    server.run(['server.js']);
    gulp.watch(['build/**/*.*'], server.notify);
});

gulp.task('html', function () {
  gulp.src('./app/index.html',{base: './app'})
    .pipe(gulp.dest('./build/'));
  gulp.src('./app/views/**/*.html',{base: './app'})
    .pipe(gulp.dest('./build/'));  
});

gulp.task('swig', function() {
  gulp.src('./app/index.html')
    .pipe(swig())
    .pipe(gulp.dest('./build/'))
});

gulp.task('browserify', function () {
  gulp.src('./app/app.js', {entry: true})
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(gulp.dest('./build/js'));
});


gulp.task('compass', function() {
  gulp.src('./src/*.scss')
    .pipe(compass({
      css: './build/css',
      sass: './app'
    }))
    .pipe(minifyCSS())
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.html', ['frontEnd']);
  gulp.watch('app/**/*.scss', ['frontEnd']);
  gulp.watch('app/**/*.js', ['frontEnd']);
});

gulp.task('frontEnd', ['browserify', 'compass', 'html']);
gulp.task('default', ['browserify', 'compass', 'html', 'watch', 'server']);