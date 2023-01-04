"use strict";

(function timeline($) {
  Drupal.behaviors.timeline = {
    attach: function attach(context) {
      var $popupTitle = $('.paragraph--type--timeline .paragraph--inner .field--type-string', context);
      var $closePopup = $('.popup-text--close', context);
      $popupTitle.on('click', function (event) {
        var target = event.target;
        $("div[data-item-id=\"".concat(target.attr('data-item-id').replace('title', 'popup'), "\"]")).addClass('open');
      });
      $closePopup.on('click', function () {
        $('.popup-text--wrapper.open').removeClass('open');
      });
    }
  };
})(jQuery);
//# sourceMappingURL=components.paragraph.timeline.js.map
