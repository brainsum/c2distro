module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "globals": {
    "Drupal": true,
    "drupalSettings": true,
    "drupalTranslations": true,
    "domready": true,
    "jQuery": true,
    "_": true,
    "matchMedia": true,
    "Cookies": true,
    "Backbone": true,
    "Modernizr": true,
    "Popper": true,
    "Sortable": true,
    "CKEDITOR": true
  },
  "extends": "airbnb",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "rules": {
    "prettier/prettier": "error",
    "max-nested-callbacks": ["warn", 3],
    "no-unused-vars": ["warn"],
    "operator-linebreak": ["error", "after", { "overrides": { "?": "ignore", ":": "ignore" } }]
  },
  "plugins": ["prettier"],
  "root": true
};
