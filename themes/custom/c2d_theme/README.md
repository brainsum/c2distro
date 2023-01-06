# C2 Distro Theme

* Created by: [Krisztian Pinter](kpinter@brainsum.com)
* Created in: 2020.
* Updated on: 2022.01.06.

## Table of Contents

* About
* Installation
* Usage
* Structure
* Coding Standards

## About

The C2 Distro Theme based on core's Classy base theme. Build process powered
by [Gulp.js 4](https://gulpjs.com/docs/en/getting-started/quick-start) and asset
files (sass, css, js) structured, linted and compiled according to Drupal Coding
Standards. You can equally run build processes by gulp commands or npm scripts.

## Installation

You will need **node.js**, **npm (yarn preferred)**, **gulp-cli (min 4.0.0)** globally installed
to working with this theme.

```bash
cd {project}/web/profiles/contrib/c2distro/themes/custom/c2d_theme
yarn install
```

## Usage

We use here Gulp.js 4 as task runner. You can run the gulp tasks directly with
gulp, like `gulp sassDev` or with package.json's scripts: `yarn start` or
`yarn run scripts`. In both you can choose from the following tasks:

```bash
start # run development version sass, scripts then watch and BrowserSync
startNoSync # same as 'start' without BrowserSync
prod # run production version sass and scripts. You must run it before commit
sassDev # run development version sass; no watch, BrowserSync in this way
sassProd # run production version sass
sassLint # Linting sass files
scripts # run scripts task; no watch, BrowserSync in this way
```

If sass process throw "/" error install this:
https://sass-lang.com/documentation/breaking-changes/slash-div
and use automatic migration method in node_modules/foundation-sites/scss/util.

$ npm install -g sass-migrator
$ sass-migrator division **/*.scss

In Gulp.js there is some extra tasks too. **Before you can run a BrowserSync
task (ex. `start` one), you need to edit `proxy` setting in the `browserSync`
config!**

## Structure

Theme's structure based on Drupal 8 coding standards and theme recommendations:

* `css` directory: for all compiled css files (not commit map files)
* `fonts` directory: for webfonts
* `images` directory: for all theme images and graphics
* `js` directory: for all compiled JavaScript files
* `js/vendors` directory: all production needed vendor libraries used from here
* `node_modules` directory: we need install all required frontend vendor libraries here
* `src/js` directory: Source js files
* `src/sass` directory: Source sass files
* `templates` directory: all twig templates in Drupal module based structure

### Sass structure

We use SMACSS and ITCSS here for structuring all sass files. We gave numbers too
for category order:

* `1.settings`: all settings file
* `2.tools`: general mixins and sass functions
* `3.base`: css reset and element (html5 tags) styling
* `4.layout`: all grid and page layout related things
* `5.components`: reusable blocks (try to use it more and more)
* `6.utilities`: utility helper classes; mostly from `2.tools`

To theming pages and __unique__ blocks we use `theme.scss` file. All files and
some directories are empty, just show how you should organize sass files.
The created files mostly just samples, you can add and remove them as project
needs.

### JavaScripts structure

Our all JavaScript files will go to `js` directory. We work from `src` directory
and place the compiled js files to `dist` directory.

### Vendor libraries

Because we don't use js bundlers, if you need a third party
css/sass/js library, and you want use it as library (instead of merging it into
your src files): Just place the dist files into js/vendors directory.

### Drupal libraries

You have to manage you compiled CSS and JavaScript files as Drupal libraries.
All libraries are defined in `libraries.yml` file. There is a global library:
we will load that in all pages. But you have to create and attach different
libraries for specified blocks / pages. For example, you can create libraries for
sliders, a specific view, a single page or block.

Don't forget to add dependencies for each library, and attributes for files
like: `minified`, `external`, `async` and so on.

Furthermore, we don't want to be aggregated these libraries by Drupal, so you
will need to add `{preprocess: false}` too.

Example for them:

```yaml
user-profile:
  js:
    //platform.twitter.com/widgets.js: { type: external, preprocess: false, attributes: { async: true } }
    js/dist/user-profile.js: { minified: true, preprocess: false }
  dependencies:
    - core/jquery
    - core/drupal
```

### Webfonts

All webfonts must be imported properly. If Internet Explorer 11 and below isn't
important and don't want to use special characters you can use Google Fonts as
external css file. (Google Fonts only support `WOFF2` webfont format) Please
use the Drupal library system for that:

```yaml
global-styling:
  css:
    base:
      //fonts.googleapis.com/css?family=Rubik:400,400i,500,700&display=swap&subset=latin-ext: { external: true }
```

Please note here: use `display=swap` for font-display property and
`subset=latin-ext` for extended language support.

In case of Internet Explorer 11 and below is important for you, you can generate
your own webfonts with a service like FontSquirrel into the `/fonts` directory.
Then make them available via `@font-face` rules in a base level Sass file,
for example in `3.base/_base.fonts.scss`:

```scss
@font-face {
  font-family: Rubik;
  src:
    url("/fonts/rubik-medium.woff2") format("woff2"),
    url("/fonts/rubik-medium.woff") format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

You may noticed, this font face declaration not placed in settings level. Here
is why: all files in settings and tools level not produced css code, so we can
import them to multiple files without duplicate css code creation.

### CSS Media queries and Breakpoints

We don't provide any grid systems or breakpoint is SASS: you can use whatever
you want. But there is a default `breakpoints.yml` file, where are some
predefined breakpoints for Drupal. You have to keep it in sync with your
actually breakpoints in SASS. (This file is only a placeholder/template file,
for easier start.)

### 3rd Party SASS libraries

If you need some external SASS files to generate your CSS, you can import them
from node_modules via gulp.js. For example if you want use Foundation for Sites
as your breakpoint and grid system, add the following paths to the Sass Gulp
tasks:

```js
function sassDevTask(done) {
  gulp
    [...]
    .pipe(sass({
      [...]
      includePaths: [
        'node_modules/foundation-sites/scss/',
        'node_modules/foundation-sites/_vendor/sassy-lists/stylesheets'
      ]
    }))
    [...];
  done();
}
```

## Coding Standards

### General Rules

First of all, we use Drupal's [.editorconfig](https://github.com/brainsum/static-boilertemplate/blob/master/.editorconfig)
for basic code styling.

All comments in Sass, PHP and JavaScript files must be in [Doxygen](https://www.drupal.org/docs/develop/standards/css/css-formatting-guidelines#comments)
format. See details in our Wiki.

### SASS/CSS Coding Standard

#### SASS/CSS Coding Style

Coding Style is based on [Drupal's CSS Coding Standard](https://www.drupal.org/docs/develop/standards/css).
We must use Doxygen comments, [SMACSS](https://smacss.com/book/categorizing)
architecture and [BEM](http://getbem.com) or [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) syntax schemes. In this theme we used [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
for structure Sass too as it's working perfectly with SMACSS.

#### SASS/CSS Linting Tools

All rules checked by **[Stylelint](https://stylelint.io)** from Drupal 8's core
(removed all rules that needed only for Drupal projects). There are Stylelint
plugins for all popular IDE/code editor, but also there is linting task in
builder tool too. Some rules can be fixed via CLI, but the most need manual
work (You will get only warning messages.).

### JavaScript Coding Standard

#### JavaScript Coding Style and Tool

JavaScript coding style based on [Drupal's JavaScript coding standard](https://www.drupal.org/docs/develop/standards/javascript).
For linting we use **[ESlint](https://eslint.org)**. The ESlint config based on
[Drupal's core ESlint config](https://www.drupal.org/docs/develop/standards/javascript/eslint-settings),
witch is based on Airbnb's React ESlint config.
