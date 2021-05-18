'use strict';

(function popup($) {
  Drupal.behaviors.popup = {
    attach: function (context) {
      let popupTitle = $('.paragraph--type--popup-text .field--name-field-title', context);
      let popupText = $('.paragraph--type--popup-text .field--name-field-description', context);
      let popupWrapper = $('.paragraph--type--popup-text .paragraph--inner', context);
      let closePopup = $('.paragraph--type--popup-text .popup-text--close', context);
      popupTitle.on('click', function (event) {
        if ($(event.target).parent('.paragraph--inner').hasClass('open')) {
          popupWrapper.removeClass('open');
        } else {
          popupWrapper.removeClass('open');
          $(event.target).parent('.paragraph--inner').addClass('open');
        }
      });
      closePopup.on('click', function () {
        popupWrapper.removeClass('open');
      });
    }
  };
})(jQuery);
