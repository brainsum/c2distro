'use strict';

/**
 * Import required node modules and other external files
 */
const autoprefixer         = require('autoprefixer');
const browserSync         = require('browser-sync').create();
const cssnano             = require('gulp-cssnano');
const gulp                = require('gulp');
const postcss             = require('gulp-postcss');
const postcssPresetEnv    = require('postcss-preset-env');
const sassGlob            = require('gulp-sass-glob');
const sass                = require('gulp-sass')(require('sass'));
const sorting             = require('postcss-sorting');
const sourcemaps          = require('gulp-sourcemaps');
const stylelint           = require('gulp-stylelint');

/**
 * Gulp config
 */
const config = {
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
  cssnano: {
    preset: ['lite', {
      colormin               : true,
      discardDuplicates      : true,
      discardOverridden      : true,
      mergeLonghand          : true,
      mergeRules             : true,
      normalizeCharset       : true,
      normalizePositions     : true,
      normalizeRepeatStyle   : true,
      normalizeString        : true,
      normalizeWhitespace    : false,
    }]
  },
  postcssPresetEnv: {
    stage: 1,
    preserve: false,
    autoprefixer: {
      cascade: false,
      grid: 'no-autoplace',
    },
    features: {
      'blank-pseudo-class': false,
      'focus-visible-pseudo-class': false,
      'focus-within-pseudo-class': false,
      'has-pseudo-class': false,
      'image-set-function': false,
      'prefers-color-scheme-query': false,
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

// Predefined Gulp tasks
let watch = '';

/**
 * SASS:Compile Task
 *
 * The all-in-one Sass task for compiling, linting sass files with live injecting into all browsers
 * @param {string} done The done argument is passed into the callback function;
 * executing that done function tells Gulp "a hint to tell it when the task is done".
 */
function sassCompileTask(done) {
  gulp
    .src(config.paths.styles.src, { sourcemaps: true })
    .pipe(sourcemaps.init({ largeFile: true }))
      .pipe(sassGlob())
      .pipe(sass())
      .on('error', sass.logError)
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(postcss([
        autoprefixer,
        postcssPresetEnv(config.postcssPresetEnv),
        sorting
      ]))
      .pipe(cssnano(config.cssnano))
    .pipe(sourcemaps.write('../maps'))
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

/**
 * Watching Task
 *
 * Watching all Sass files; if it see any .scss file has been changed, it runs sassCompileTask then browserSyncReloadTask
 * tasks after each other.
 */
watch = () => gulp.watch(
  config.paths.styles.src,
  { ignoreInitial: false },
  gulp.series(
    sassCompileTask,
    browserSyncReloadTask
  )
);

/**
 * Export Gulp tasks
 */
exports.default = gulp.series(sassCompileTask, browserSyncTask, watch);
exports.sass = sassCompileTask;
exports.sassLint = sassLintTask;
exports.critical = gulp.series(sassCompileTask, criticalTask);

