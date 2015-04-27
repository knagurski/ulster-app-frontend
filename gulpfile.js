// requires
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    uglifyCSS    = require('gulp-uglifycss'),
    bower        = require('gulp-bower'),
    rename       = require('gulp-rename'),
    imagemin     = require('gulp-imagemin'),
    sequence     = require('gulp-sequence');

// paths
var paths = {
  css: {
    source: 'src/styles/layout.scss',
    dest: 'dist/styles',
    watch: 'src/styles/**/*.scss'
  },
  js: {
    source: 'src/scripts/**/*.js',
    dest: 'dist/scripts'
  },
  images: {
    source: [
      'src/images/**/*.png',
      'src/images/**/*.jpg',
      'src/images/**/*.svg'
    ],
    dest: 'dist/images'
  }
};

// compile sass files
gulp.task('sass', function () {
  return gulp.src(paths.css.source)
    .pipe(sass())
    // prefix for the last 5 browser versions
    .pipe(autoPrefixer({browsers: ['last 5 versions']}))
    // output non-minified version
    .pipe(gulp.dest(paths.css.dest))
    // minimise css
    .pipe(uglifyCSS())
    // add .min suffix
    .pipe(rename({suffix: '.min'}))
    // output the minified version
    .pipe(gulp.dest(paths.css.dest));
});

// JS
gulp.task('images', function () {
  return gulp.src(paths.images.source)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
});

// install bower dependancies
gulp.task('bower', function () {
  return bower();
});

// watch for changes
gulp.task('watch', ['default'], function () {
  gulp.watch(paths.css.watch, ['sass']);
  gulp.watch(paths.images.source, ['images']);
});

// allow running with default task
gulp.task('default', ['sass', 'images']);

// install bower and then run the default task to build resources
gulp.task('install', sequence('bower', 'default'));
