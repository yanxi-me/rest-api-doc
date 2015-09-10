'use strict';

var config = require('../config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var handleErrors = require('../util/handleErrors');

gulp.task('styles', function () {

    return gulp.src(config.styles.src)
        .pipe(sass({
            sourceComments: config.isProd() ? 'none' : 'map',
            sourceMap: 'sass',
            outputStyle: config.isProd() ? 'compressed' : 'nested'
        }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .on('error', handleErrors)
        .pipe(gulpif(config.isProd(), rename(function (path) {
            path.dirname += "";
            path.basename += "-" + config.buildTime;
            path.extname += '';
        })))
        .pipe(gulp.dest(config.styles.dest()))
        .pipe(gulpif(browserSync.active, browserSync.reload({stream: true})));
});