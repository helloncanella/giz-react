var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plugins = require('gulp-load-plugins')();

// Static Server + watching scss/html files
gulp.task('serve', ['babel'], function() {

  browserSync.init({notify: false, server: 'app'});

  gulp.watch('app/scripts/src/**/*.js', ['babel']);
  gulp.watch('app/*.html')
    .on('change', browserSync.reload);
});

gulp.task('babel', function() {
  return gulp.src('app/scripts/src/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.babel())
    .pipe(gulp.dest('app/scripts/dist'))
    .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);
