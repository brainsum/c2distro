(function quote($) {
  Drupal.behaviors.quote = {
    attach(context) {
      const $popupTitle = $('.paragraph--type--quotes .paragraph--type--quote-paragraph', context);
      const $closePopup = $('.paragraph--type--popup-text .popup-text--close', context);

      $popupTitle.on('click', (event) => {
        if ($(event.target).parents('.paragraph--type--quote-paragraph').hasClass('open')) {
          $(event.target).parents('.paragraph--type--quote-paragraph').removeClass('open');
        } else {
          $popupTitle.removeClass('open');
          $(event.target).parents('.paragraph--type--quote-paragraph').addClass('open');
        }
      });

      $closePopup.on('click', () => {
        $popupTitle.removeClass('open');
      });
    },
  };
}(jQuery));
