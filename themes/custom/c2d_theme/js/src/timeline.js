'use strict';

(function timeline($) {
  Drupal.behaviors.timeline = {
    attach: function (context) {
      let popupTitle = $('.paragraph--type--timeline .paragraph--inner .field--type-string', context);
      let closePopup = $('.popup-text--close', context);
      popupTitle.on('click', function (event) {
        let target = $(event.target);
        $(`div[data-item-id="${target.attr('data-item-id').replace('title', 'popup')}"]`).addClass('open');
      });
      closePopup.on('click', function () {
        $('.popup-text--wrapper.open').removeClass('open');
      });
    }
  };
})(jQuery);
