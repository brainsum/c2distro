(function c2distroLoader($) {
  Drupal.behaviors.c2distroLoader = {
    attach(context) {
      if (($(context).is(document)) || (context === document)) {
        $('form').submit(() => {
          $('body').prepend('<div class="custom-loader"><div class="loader"><div></div><div></div></div></div>');
        });
      }
    },
  };
}(jQuery));
