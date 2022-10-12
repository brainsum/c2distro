'use strict';

/**
 * Import required node modules and other external files
 */
require('dotenv').config();
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const cssnanoLite = require('cssnano-preset-lite');
const eslint = require('gulp-eslint-new');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const sorting = require('postcss-sorting');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');

/**
 * Gulp config
 */
const config = {
  paths: {
    styles: {
      src: './src/sass/**/*.scss',
      dest: './css/'
    },
    scripts: {
      src: './src/js/*.js',
      dest: './js/'
    }
  },
  cssnano: {
    preset: [cssnanoLite, {
      discardDuplicates: true,
      discardOverridden: true,
      mergeRules: true,
      normalizeCharset: true,
      normalizeString: true,
      normalizeWhitespace: false,
    }]
  },
  sass: {
    outputStyle: 'expanded',
    precision: 10,
    includePaths: [
      './node_modules/breakpoint-sass/stylesheets/breakpoint',
    ]
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
    proxy: process.env.BROWSERSYC_PROXY,
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
    .pipe(sass(config.sass))
    .on('error', sass.logError)
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss([
      autoprefixer,
      postcssPresetEnv(config.postcssPresetEnv),
      sorting,
      cssnano(config.cssnano)
    ]))
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
 * JavaScript Task
 *
 * Currently, there is only one JavaScript task (not separated for dev and prod).
 * And only run ESlint to detect errors.
 * @param {string} done The done argument is passed into the callback function;
 * executing that done function tells Gulp "a hint to tell it when the task is done".
 */
function scriptsTask(done) {
  gulp
    .src(config.paths.scripts.src, { sourcemaps: true })
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(config.paths.scripts.dest))
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
    browser: config.browserSync.browsers,
    files: [
      './css/**/*',
      './js/**/*',
      './templates/**/*',
      './*.yml',
      './*.theme',
    ],
    watchEvents: ['add', 'change'],
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
 * Watching all Sass files; if it sees any .scss file has been changed, it runs sassCompileTask then browserSyncReloadTask
 * tasks after each other.
 */
watch = () => gulp.watch(
  [
    config.paths.styles.src,
    config.paths.scripts.src
  ],
  gulp.series(
    sassCompileTask,
    scriptsTask,
    browserSyncReloadTask
  )
);

/**
 * Export Gulp tasks
 */
exports.default = gulp.series(sassCompileTask, scriptsTask, browserSyncTask, watch);
exports.sass = sassCompileTask;
exports.scripts = scriptsTask;
exports.sassLint = sassLintTask;
