"use strict";

(function accordion($) {
  Drupal.behaviors.accordion = {
    attach: function attach(context) {
      var $accordionParagraph = $('.paragraph--type--accordion', context);
      var $accordionHeader = $accordionParagraph.find('.field--name-field-title');
      var $accordionHolder = $accordionParagraph.find('.paragraph--inner');
      $accordionHeader.on('click', function accordionToggling(event) {
        if ($(event.target).parent('.paragraph--inner').hasClass('open')) {
          $accordionHolder.removeClass('open');
        } else {
          $accordionHolder.removeClass('open');
          $(event.target).parent('.paragraph--inner').addClass('open');
        }
      });
    }
  };
})(jQuery);
//# sourceMappingURL=../maps/comonents.accordion.js.map
