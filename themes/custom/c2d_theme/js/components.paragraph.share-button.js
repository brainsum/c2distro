"use strict";

(function shareButton(document, Drupal, $) {
  /**
   * Share Button from IFRC.org
   * Setup and attach the Share link behaviors.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.shareButton = {
    attach: function attach(context) {
      if ($(context).is(document)) {
        $('.share-button img').on('click', function () {
          $('#linksDropdown').toggleClass('share-links-open');
        });
      }
    }
  };
})(document, Drupal, jQuery);
//# sourceMappingURL=components.paragraph.share-button.js.map
