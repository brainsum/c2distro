'use strict';

(function mainMenu($, Drupal) {
  Drupal.behaviors.mainmenu = {
    attach: function (context) {
      if ($(context).is(document)) {
        let hamburgerIcon = $(context).find('.hamburger');
        let closeMenuIcon = $(context).find('.close-menu');
        let mainMenu = $(context).find('.menu--main');
        let expandableItem = $(context).find('.menu-item--expanded .js-dropdown-arrow');
        hamburgerIcon.on('click', function () {
          mainMenu.addClass('open');
        });
        closeMenuIcon.on('click', function () {
          mainMenu.removeClass('open');
        });
        expandableItem.on('click', function (e) {
          let itemParent = $(e.target).parent();
          // closeSearch();
          if (itemParent.hasClass('opened')) {
            itemParent.removeClass('opened');
          } else {
            expandableItem.parent().removeClass('opened')
            itemParent.addClass('opened');
          }
        });
      }
    }
  };
})(jQuery, Drupal);
