'use strict';

(function accordion($) {
  Drupal.behaviors.accordion = {
    attach: function (context) {
      let accordionHeader = $('.paragraph--type--accordion .paragraph--type--item .field--name-field-title', context);
      let accordionHolder = $('.paragraph--type--accordion .paragraph--type--item .paragraph--inner', context);
      accordionHeader.on('click', function (event) {
        if ($(event.target).parent('.paragraph--inner').hasClass('open')) {
          accordionHolder.removeClass('open');
        } else {
          accordionHolder.removeClass('open');
          $(event.target).parent('.paragraph--inner').addClass('open');
        }
      })
    }
  };
})(jQuery);
