"use strict";

(function timeline($) {
  Drupal.behaviors.timeline = {
    attach: function attach(context) {
      var $popupTitle = $('.paragraph--type--timeline .paragraph--inner .field--type-string', context);
      var $closePopup = $('.popup-text--close', context);
      $popupTitle.on('click', function openPopup(event) {
        var target = event.target;
        $("div[data-item-id=\"".concat(target.attr('data-item-id').replace('title', 'popup'), "\"]")).addClass('open');
      });
      $closePopup.on('click', function closePopup() {
        $('.popup-text--wrapper.open').removeClass('open');
      });
    }
  };
})(jQuery);
//# sourceMappingURL=../maps/components.timeline.js.map
