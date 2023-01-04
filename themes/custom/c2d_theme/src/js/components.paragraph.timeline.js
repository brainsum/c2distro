'use strict';

(function timeline($) {
  Drupal.behaviors.timeline = {
    attach: function (context) {
      const $popupTitle = $('.paragraph--type--timeline .paragraph--inner .field--type-string', context);
      const $closePopup = $('.popup-text--close', context);

      $popupTitle.on('click', function openPopup(event) {
        const target = (event.target);
        $(`div[data-item-id="${target.attr('data-item-id').replace('title', 'popup')}"]`).addClass('open');
      });

      $closePopup.on('click', function closePopup() {
        $('.popup-text--wrapper.open').removeClass('open');
      });
    }
  };
})(jQuery);
