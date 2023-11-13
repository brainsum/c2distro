(function popup($) {
  Drupal.behaviors.popup = {
    attach(context) {
      const $popupParagraph = $('.paragraph--type--popup-text', context);
      const $popupTitle = $popupParagraph.find('.field--name-field-title');
      const $popupWrapper = $popupParagraph.find('.paragraph--inner');
      const $closePopup = $popupParagraph.find('.popup-text--close');

      $popupTitle.on('click', (event) => {
        if ($(event.target).parent('.paragraph--inner').hasClass('open')) {
          $popupWrapper.removeClass('open');
        } else {
          $popupWrapper.removeClass('open');
          $(event.target).parent('.paragraph--inner').addClass('open');
        }
      });

      $closePopup.on('click', () => {
        $popupWrapper.removeClass('open');
      });
    },
  };
}(jQuery));
