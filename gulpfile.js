var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require("glob");
var _ = require('lodash');

var sourceFiles = [], b, opts;

// Static Server + watching scss/html files
gulp.task('serve', ['browserify'], function() {

  browserSync.init({notify: false, server: 'app'});

  gulp.watch('app/scripts/src/**/*.js', ['browserify']);
  gulp.watch('app/*.html')
    .on('change', browserSync.reload);

});

gulp.task('browserify', bundle); // so you can run `gulp js` to build the file

function bundle() {

  //Update de browserify options if a file was added in the source folder
  var currentSourceFiles = glob.sync("app/scripts/src/**/*.js");

  if(!_.isEqual(sourceFiles.sort(), currentSourceFiles.sort())){
    sourceFiles = currentSourceFiles;
    configBrowserify();
  }

  return b.bundle()
    // log errors if they happen
    .pipe(plugins.plumber())
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/scripts/dist'))
    .pipe(browserSync.stream());
}

function configBrowserify() {

  // add custom browserify options here
  var customOpts = {
    entries: sourceFiles,
    debug: true
  };

  opts = Object.assign({}, watchify.args, customOpts);
  b = watchify(browserify(opts));

  // add transformations here
  // i.e. b.transform(coffeeify);
  b.transform("babelify", {presets: ["es2015"]});

  b.on('update', bundle); // on any dep update, runs the bundler
  b.on('log', gutil.log); // output build logs to terminal
}
