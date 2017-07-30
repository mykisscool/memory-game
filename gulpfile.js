var gulp = require('gulp');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

var jsPaths = [
  'bower_components/KineticJS/kinetic.js',
  'bower_components/Modernizr/modernizr.js',
];

gulp.task('copy-vendor-js', function () {
  return gulp.src(jsPaths)
    .pipe(gulp.dest('./build'));
});

gulp.task('concat-vendor-js', function () {
  return gulp.src([
    './build/kinetic.js',
    './build/modernizr.js'
  ])
  .pipe(rimraf())
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('minify-vendor-js', function () {
  return gulp.src('./build/vendor.js')
    .pipe(uglify({ preserveComments: 'license' }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rimraf())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build'));
});

gulp.task('minify-memory-game-js', function () {
  return gulp.src('./src/js/game.js')
    .pipe(uglify({ preserveComments: 'license' }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build'));
});

gulp.task('concat-all-js', function () {
  return gulp.src([
    './build/vendor.min.js',
    './build/game.min.js'
  ])
  .pipe(concat('memory-game.js'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('default', function () {
  runSequence(
    [
      'copy-vendor-js'
    ],
    [
      'concat-vendor-js'
    ],
    [
      'minify-vendor-js',
      'minify-memory-game-js'
    ],
    [
      'concat-all-js'
    ]
  );
});

gulp.task('watch', function () {
  gulp.watch('src/js/game.js',
    [
      'minify-memory-game-js',
      'concat-all-js'
  ]);
});
