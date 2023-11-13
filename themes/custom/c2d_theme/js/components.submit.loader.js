(function c2distroLoader($) {
  Drupal.behaviors.c2distroLoader = {
    attach: function attach(context) {
      if ($(context).is(document) || context === document) {
        $('form').submit(function () {
          $('body').prepend('<div class="custom-loader"><div class="loader"><div></div><div></div></div></div>');
        });
      }
    }
  };
})(jQuery);
//# sourceMappingURL=components.submit.loader.js.map
