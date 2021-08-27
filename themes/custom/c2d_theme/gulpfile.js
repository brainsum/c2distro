'use strict';

/**
 * Import required node modules and other external files
 */
var autoprefixer         = require('autoprefixer');
var browserSync         = require('browser-sync').create();
var gulp                = require('gulp');
var postcss             = require('gulp-postcss');
var sassGlob = require('gulp-sass-glob');
var sass                = require('gulp-sass')(require('sass'));
var sourcemaps          = require('gulp-sourcemaps');
var stylelint          = require('gulp-stylelint');
var sorting = require('postcss-sorting');
var stripCssComments = require('gulp-strip-css-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');

/**
 * Gulp config
 */
var config = {
  paths: {
    styles: {
      src: './sass/**/*.scss',
      dest: './css/'
    },
    scripts: {
      src: './js/src/*.js',
      dest: './js/dist/'
    }
  },
  browserSync: {
    proxy: 'http://c2distro.docker.localhost:8000',
    autoOpen: false,
    browsers: [
      'Google Chrome'
    ]
  }
};

// Predefined complex Gulp tasks
var compileTask = '';

/**
 * Sass settings
 *
 * Set Sass compiler. There are two options:
 * - require('sass') for Dart Sass
 * - require('node-sass') for Node Sass (LibSass)
 */
sass.compiler = require('sass');

/**
 * SASS:Compile Task
 *
 * The all-in-one Sass task for compiling, linting sass files with live injecting into all browsers
 * @param {string} done The done argument is passed into the callback function;
 * executing that done function tells Gulp "a hint to tell it when the task is done".
 */
function sassCompileTask(done) {
  gulp
    .src(config.paths.styles.src)
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 10
    }))
    .on('error', sass.logError)
    .pipe(postcss([
      autoprefixer(),
      sorting(),
    ]))
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.paths.styles.dest))
    .pipe(browserSync.stream());
  done();
}

function sassCompileTaskProd(done) {
  gulp
    .src(config.paths.styles.src)
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed',
      precision: 10
    }))
    .on('error', sass.logError)
    .pipe(stripCssComments({
      preserve: true,
      whitespace: true,
    }))
    .pipe(removeEmptyLines())
    .pipe(postcss([
      autoprefixer(),
      sorting(),
    ]))
    .pipe(gulp.dest(config.paths.styles.dest))
  done();
}

/**
 * SASS:Linting Task
 *
 * Run only StyleLint task to check errors.
 * @param {string} done The done argument is passed into the callback function;
 * executing that done function tells Gulp "a hint to tell it when the task is done".
 */
function sassLintTask(done) {
  gulp
    .src(config.paths.styles.src)
    .pipe(stylelint({
      reporters: [
        {
          formatter: 'verbose',
          console: true
        }
      ],
      debug: true,
      failAfterError: false,
      fix: true
    }))
  done();
}

/**
 * Critical CSS Task
 *
 * Generate & Inline Critical-path CSS.
 * @param {string} done The done argument is passed into the callback function;
 * executing that done function tells Gulp "a hint to tell it when the task is done".
 */
function criticalTask(done) {
  critical.generate(config.critical, config.pages);
  done();
}

/**
 * JavaScript Task
 *
 * Currently there is only one JavaScript task (no separated for dev and prod).
 * And only run ESlint to detect errors.
 * @param {string} done The done argument is passed into the callback function;
 * executing that done function tells Gulp "a hint to tell it when the task is done".
 */
function scriptsTask(done) {
  gulp
    .src(config.paths.scripts.src)
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(gulp.dest(config.paths.scripts.dest))
    .pipe(browserSync.stream());
  done();
}

/**
 * BrowserSync Task
 *
 * Watching Sass and JavaScript source files for changes.
 * @param {string} done The done argument is passed into the callback function;
 * executing that done function tells Gulp "a hint to tell it when the task is done".
 */
function browserSyncTask(done) {
  browserSync.init({
    proxy: config.browserSync.proxy,
    open: config.browserSync.autoOpen,
    browser: config.browserSync.browsers
  });
  gulp.watch(config.paths.styles.src, sassCompileTask);
  done();
}

/**
 * BrowserSync Reload Task
 *
 * BrowserSync will reload all synced browsers.
 * @param {function} done Reload event.
 */
function browserSyncReloadTask(done) {
  browserSync.reload();
  done();
}

// Define complex tasks
compileTask = gulp.parallel(sassCompileTask, scriptsTask);

/**
 * Export Gulp tasks
 */
exports.default = gulp.series(sassCompileTask, browserSyncTask);
exports.lint = gulp.parallel(sassLintTask, scriptsTask);
exports.sass = sassCompileTask;
exports.sassprod = sassCompileTaskProd;
exports.sassLint = sassLintTask;
exports.scripts = scriptsTask;
exports.watch = browserSyncTask;
exports.critical = gulp.series(sassCompileTask, criticalTask);

