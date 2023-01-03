"use strict";

(function popup($) {
  Drupal.behaviors.popup = {
    attach: function attach(context) {
      var $popupParagraph = $('.paragraph--type--popup-text', context);
      var $popupTitle = $popupParagraph.find('.field--name-field-title');
      var $popupWrapper = $popupParagraph.find('.paragraph--inner');
      var $closePopup = $popupParagraph.find('.popup-text--close');
      $popupTitle.on('click', function openPopup(event) {
        if ($(event.target).parent('.paragraph--inner').hasClass('open')) {
          $popupWrapper.removeClass('open');
        } else {
          $popupWrapper.removeClass('open');
          $(event.target).parent('.paragraph--inner').addClass('open');
        }
      });
      $closePopup.on('click', function closePopup() {
        $popupWrapper.removeClass('open');
      });
    }
  };
})(jQuery);
//# sourceMappingURL=../maps/components.popup.js.map
