(function timeline($) {
  Drupal.behaviors.timeline = {
    attach(context) {
      const $popupTitle = $('.paragraph--type--timeline .paragraph--inner .field--type-string', context);
      const $closePopup = $('.popup-text--close', context);

      $popupTitle.on('click', (event) => {
        const { target } = event;
        $(`div[data-item-id="${target.attr('data-item-id').replace('title', 'popup')}"]`).addClass('open');
      });

      $closePopup.on('click', () => {
        $('.popup-text--wrapper.open').removeClass('open');
      });
    },
  };
}(jQuery));
