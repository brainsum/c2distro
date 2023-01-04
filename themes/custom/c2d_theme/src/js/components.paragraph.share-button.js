(function shareButton(document, Drupal, $) {
  'use strict';

  /**
   * Share Button from IFRC.org
   * Setup and attach the Share link behaviors.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.shareButton = {
    attach: function (context) {
      if ($(context).is(document)) {
        $('.share-button img').on('click', function openShareLinks() {
          $('#linksDropdown').toggleClass('share-links-open');
        })
      }
    }
  };
})(document, Drupal, jQuery);
