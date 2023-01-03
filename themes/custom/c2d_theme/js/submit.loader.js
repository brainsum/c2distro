"use strict";

(function c2distroLoader($) {
  Drupal.behaviors.c2distroLoader = {
    attach: function attach(context) {
      if ($(context).is(document) || context === document) {
        $('form').submit(function formSubmit() {
          $('body').prepend('<div class="custom-loader"><div class="loader"><div></div><div></div></div></div>');
        });
      }
    }
  };
})(jQuery);
//# sourceMappingURL=../maps/submit.loader.js.map
