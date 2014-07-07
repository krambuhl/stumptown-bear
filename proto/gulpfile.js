//gulp
var gulp = require('gulp');
// require('gulp-grunt')(gulp);

// npm package
var pkg = require('./package.json');

// npm tools
var fs = require('fs');
var path  = require('path');
var slice = require('sliced');
var es = require('event-stream');
var _ = require('underscore');

// gulp general plugins
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var refresh = require('gulp-livereload');
var cache = require('gulp-cache');
var source = require('vinyl-source-stream');
var map = require('map-stream');
var concatMaps = require('gulp-concat-sourcemap');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var inject = require("gulp-inject");
var handlebars = require('gulp-compile-handlebars');
var ftp = require('gulp-ftp');
var browserify = require('gulp-browserify');

// css tasks
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var cmq = require('gulp-combine-media-queries');
var minify = require('gulp-clean-css');

// js tasks
var uglify = require('gulp-uglify');

// browserify
var watchify = require('watchify');

// docs & tests
var docco = require("gulp-docco");
var wrapDocco = require('gulp-wrap-docco');

// project directories
var sourceDir = './source';
var destDir = './dist';
var testsDir = './tests';

// assets directories
var css = 'sass';
var app = 'app';
var javascript = 'scripts';
var images = 'images';
var templates = 'templates';

// filetype globs
var docGlob = '**/*.{js,css,sass,scss,json,md,html,hbs,handlebars}';
var rawGlob = '**/*.{js,css,sass,scss,md}';


// helper functions


// dir() builds a path from fragments
function dir() { return slice(arguments).join('/'); }



// __styles__ task:
// - sass
// - autoprefixer
// - media query combiner
// - css minifier
gulp.task('styles', function() {
  return gulp.src(dir(sourceDir, css, 'style.scss'))
    .pipe(sass({ style: 'expanded', errLogToConsole: true })) //sourceComments: 'map',
    .pipe(cmq())
    .pipe(autoprefix('last 3 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', { cascade: true }))
    .pipe(gulp.dest(destDir))
    .pipe(minify())
    .pipe(rename('min/style.min.css'))
    .pipe(gulp.dest(destDir));
});



// __app__ task:
// - watchify
//   - watch app directory
//   - browserify
//     + output: 'app-bundle.js'

gulp.task('watchify', function() {
  var bundler = watchify(dir(sourceDir, 'app', 'app.js'), { debug: true });

  bundler.transform('brfs');
  bundler.on('update', rebundle);

  function rebundle () {
    return bundler.bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest(destDir));
  }

  return rebundle();
});

gulp.task('browserify', function () {
  return gulp.src(dir(sourceDir, 'app', 'app.js'))
    .pipe(browserify({
      insertGlobals : true,
      debug: false
    }))
    .pipe(gulp.dest(dir(destDir, 'app.js')));
});



// __build__ task:
// compiles static templates with enviornment data
//
// - static handlebars
//   + output: various files to './dist/'
gulp.task('build', function() {
  var data = require(dir(sourceDir, "config.json"));

  var options = {
    helpers: { }
  };

  return gulp.src(dir(sourceDir, 'index.html'))
    .pipe(handlebars(data, options))
    .pipe(gulp.dest(destDir));
});


gulp.task('copy-images', function() {
  return gulp.src(dir(sourceDir, images, '**/*.{jpg,jpeg,png,gif}'))
    .pipe(gulp.dest(dir(destDir, images)));
});

gulp.task('copy-fonts', function() {
  return gulp.src(dir(sourceDir, 'fonts', '**/*'))
    .pipe(gulp.dest(dir(destDir, 'fonts')));
});


// __watch__ task:
gulp.task('watch', function () {

  // run `styles` task on css file changes
  gulp.watch(dir(sourceDir, css, '**/*.{css,sass,scss}'), ['styles']);


  // run `app` task on js file changes in './source/app'
  gulp.watch(dir(sourceDir, app, '**/*.js'), ['app']);

  // run `icons` task on svg file changes in './source/svg'
  gulp.watch(dir(sourceDir, 'svg', '**/*.svg'), ['icons']);

  // run `app` task on js file changes in './source/app'
  gulp.watch(dir(sourceDir, '**/*.{json,html,hbs,handlebars}'), ['build']);
});


gulp.task('upload', ['compile'], function () {
  gulp.src(dir(destDir, '**/*'))
    .pipe(ftp(require('./ftp.json')));
});

// gulp.task('bump', function () {
//   return gulp.src(['./package.json', './bower.json'])
//     .pipe(bump())
//     .pipe(gulp.dest('./'));
// });


gulp.task('copy', ['copy-images', 'copy-fonts']);

gulp.task('compile', ['styles', 'copy', 'build']);

gulp.task('default', ['compile', 'watchify',  'watch']);
gulp.task('heroku-build', ['compile', 'browserify']);
