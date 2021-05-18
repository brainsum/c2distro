'use strict';

(function mainMenu($, Drupal) {
  Drupal.behaviors.mainmenu = {
    attach: function (context) {
      if ($(context).is(document)) {
        let hamburgerIcon = $(context).find('.hamburger');
        let closeMenuIcon = $(context).find('.close-menu');
        let mainMenu = $(context).find('#block-dislaw-theme-main-menu');
        hamburgerIcon.on('click', function () {
          mainMenu.addClass('open');
        });
        closeMenuIcon.on('click', function () {
          mainMenu.removeClass('open');
        });
      }
    }
  };
})(jQuery, Drupal);
