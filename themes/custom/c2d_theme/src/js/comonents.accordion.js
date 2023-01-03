'use strict';

(function accordion($) {
  Drupal.behaviors.accordion = {
    attach: function (context) {
      const $accordionParagraph = $('.paragraph--type--accordion', context);
      const $accordionHeader = $accordionParagraph.find('.field--name-field-title');
      const $accordionHolder = $accordionParagraph.find('.paragraph--inner');

      $accordionHeader.on('click', function accordionToggling(event) {
        if ($(event.target).parent('.paragraph--inner').hasClass('open')) {
          $accordionHolder.removeClass('open');
        } else {
          $accordionHolder.removeClass('open');
          $(event.target).parent('.paragraph--inner').addClass('open');
        }
      })
    }
  };
})(jQuery);
