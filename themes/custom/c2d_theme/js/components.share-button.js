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
        $('.share-button img').on('click', function openShareLinks() {
          $('#linksDropdown').toggleClass('share-links-open');
        });
      }
    }
  };
})(document, Drupal, jQuery);
//# sourceMappingURL=../maps/components.share-button.js.map
