/**
 * @file
 * Language Selector Component.
 *
 * Override dropdown_language_selector.js for:
 * - no jQuery dependency
 * - active class change
 * - added aria-extended attribute
 */

(function (Drupal) {
  function init(el) {
    var languageBlock = document.querySelector('.block-dropdown-language');
    var button = languageBlock.querySelector('.dropbutton__button');
    var dropdown = languageBlock.querySelector('.language-list__dropdown');
    var sumLanguages = dropdown.childElementCount;
    el.setAttribute('aria-expanded', 'true');
    dropdown.style.setProperty('--language-list__dropdown', sumLanguages);
    function dropdownHandling(e) {
      var wrapper = e.currentTarget.closest('.dropbutton');
      if (typeof wrapper !== 'undefined' && wrapper !== null) {
        e.preventDefault();
        e.stopPropagation();
        if (!wrapper.classList.contains('is-active')) {
          e.currentTarget.setAttribute('aria-expanded', 'true');
          wrapper.classList.add('is-active');
          dropdown.classList.add('is-active');
        } else {
          e.currentTarget.setAttribute('aria-expanded', 'false');
          wrapper.classList.remove('is-active');
          dropdown.classList.remove('is-active');
        }
        document.addEventListener('click', function () {
          el.setAttribute('aria-expanded', 'false');
          wrapper.classList.remove('is-active');
          dropdown.classList.remove('is-active');
        });
        dropdown.addEventListener('click', function () {
          e.stopPropagation();
        });
      }
    }
    el.addEventListener('click', dropdownHandling);
    button.addEventListener('click', dropdownHandling);
  }
  Drupal.behaviors.c2dLanguageSwitcher = {
    attach: function attach(context) {
      context.querySelectorAll('.language-list__item .active-language').forEach(function (el) {
        return init(el);
      });
    }
  };
})(Drupal);
//# sourceMappingURL=components.block.language-switcher.js.map
