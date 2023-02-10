/**
 * @file
 * Language Selector Component.
 *
 * Override dropdown_language_selector.js for:
 * - no jQuery dependency
 * - active class change
 * - added aria-extended attribute
 */

((Drupal) => {
  function init(el) {
    const languageBlock = document.querySelector('.block-dropdown-language');
    const button = languageBlock.querySelector('.dropbutton__button');
    const dropdown = languageBlock.querySelector('.language-list__dropdown');
    const sumLanguages = dropdown.childElementCount;

    el.setAttribute('aria-expanded', 'true');
    dropdown.style.setProperty('--language-list__dropdown', sumLanguages);

    function dropdownHandling(e) {
      const wrapper = e.currentTarget.closest('.dropbutton');

      if (typeof (wrapper) !== 'undefined' && wrapper !== null) {
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

        document.addEventListener('click', () => {
          el.setAttribute('aria-expanded', 'false');
          wrapper.classList.remove('is-active');
          dropdown.classList.remove('is-active');
        });

        dropdown.addEventListener('click', () => {
          e.stopPropagation();
        });
      }
    }

    el.addEventListener('click', dropdownHandling);
    button.addEventListener('click', dropdownHandling);
  }

  Drupal.behaviors.c2dLanguageSwitcher = {
    attach(context) {
      context
        .querySelectorAll('.language-list__item .active-language')
        .forEach((el) => init(el));
    },
  };
})(Drupal);
