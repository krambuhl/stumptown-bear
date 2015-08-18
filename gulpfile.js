var gulp = require('gulp');
var path = require('path');
 
// package.json data
var pkg = require('./package.json');
 
// general plugins
var sequence = require('run-sequence');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var _ = require('lodash');
 
// Task `empty`
// empties the dist folder before each startup
var del = require('del');
gulp.task('empty', function(done) {
  del('dist/**/*', done)
});
 
// Task `styles`
// compiles stylesheet and optimises file
var sass = require('gulp-ruby-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
 
gulp.task('styles', function() {
  return sass('source/styles/')
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 version'] })
    ]))
    .pipe(gulp.dest('dist/assets'));
});
 
// Task `scripts`
// compiles app script and optimises files
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
 
gulp.task('scripts', function() {
  var b = browserify({ 
    entries: './source/scripts/main.js',
    debug: true
  });
 
  b.transform(babelify);
  b.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets'));
});


// Task `icons`
// takes a folder of svgs and creates a font
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

gulp.task('icons', function(){
  return gulp.src(['source/svg/*.svg'])
    .pipe(iconfont({ 
      fontName: 'stb-icons',
      normalize: true
    }))
    .on('glyphs', function(glyphs, options) {
      gulp.src('source/styles/icons.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs
        }))
        .pipe(gulp.dest('dist/assets'));
    })
    .pipe(gulp.dest('dist/assets/fonts/'));
});
 
// Task `copy`
// copies assets
gulp.task('copy', ['copy-images', 'copy-fonts']);
 
// Task `copy-images`
// minimizes and copies images
gulp.task('copy-images', function() {
  return gulp.src('source/images/**/*')
    .pipe(gulp.dest('dist/assets/images'));
});
 
// Task `copy-fonts`
// copies fonts folder to dist
gulp.task('copy-fonts', function() {
  return gulp.src('source/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'));
});
 
// Task `pages`
// assembles pages
var swig = require('swig');
var metalfile = require('./metalfile.js');
var Metalsmith = require('metalsmith');

gulp.task('pages', function(done) {
  swig.invalidateCache()

  var m = new Metalsmith(__dirname)
    .clean(false)
    .source('source/templates')
    .destination('dist');

  metalfile.forEach(function(plugin) {
    m.use(plugin);
  });

  m.build(function(err) {
    if (err) throw err;
    done(err);
  });
});


// Task `zip`
// archives dist folder into zip
var zip = require('gulp-zip');
gulp.task('zip', function() { 
  return gulp.src('dist/**/*')
    .pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
    .pipe(gulp.dest('archives'));
});
 
// Task `archive`
// task runner for archiving files
gulp.task('archive', function(done) {
  sequence('compile', 'zip', done);
});
 
// Task `watch`
// run various tasks on file changes
// var livereload = require('livereload');
gulp.task('watch', function () {
  // run `styles` task on css file changes in `./
  gulp.watch('source/styles/**/*', ['styles']);
 
  // run `app` task on js file changes in './source/app'
  gulp.watch('source/scripts/**/*', ['scripts']);
 
  // run `images` task on js file changes in './source/images'
  gulp.watch('source/images/**/*', ['copy-images']);
 
  // run `app` task on js file changes in './source/app'
  gulp.watch('source/templates/**/*', ['pages']);
 
  // ping livereload sever when dist folder files change
  // gulp.watch('dist/**/*').on('change', livereload.changed);
  // livereload.listen();
});
 
// Task `compile`
// Deletes dist folder and builds site from scratch
gulp.task('compile', function(done) {
  sequence('empty', ['styles', 'scripts', 'pages', 'icons', 'copy'], done);
});
 
// Task `develop`
// Runs `compile` task then watches for file changes
gulp.task('develop', function(done) {
  sequence('compile', 'watch', done);
});
 
gulp.task('default', ['develop']);