"use strict";

(function quote($) {
  Drupal.behaviors.quote = {
    attach: function attach(context) {
      var $popupTitle = $('.paragraph--type--quotes .paragraph--type--quote-paragraph', context);
      var $closePopup = $('.paragraph--type--popup-text .popup-text--close', context);
      $popupTitle.on('click', function (event) {
        if ($(event.target).parents('.paragraph--type--quote-paragraph').hasClass('open')) {
          $(event.target).parents('.paragraph--type--quote-paragraph').removeClass('open');
        } else {
          $popupTitle.removeClass('open');
          $(event.target).parents('.paragraph--type--quote-paragraph').addClass('open');
        }
      });
      $closePopup.on('click', function () {
        $popupTitle.removeClass('open');
      });
    }
  };
})(jQuery);
//# sourceMappingURL=components.paragraph.quote.js.map
