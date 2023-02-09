'use strict';

(function mainMenu($, Drupal) {
  Drupal.behaviors.mainmenu = {
    attach: function (context) {
      if ($(context).is(document)) {
        const $hamburgerIcon = $(context).find('.hamburger');
        const $closeMenuIcon = $(context).find('.close-menu');
        const $mainMenu = $(context).find('.menu--main');
        const $expandableItem = $(context).find('.menu-item--expanded .js-dropdown-arrow');
        const $body = $('body');

        $hamburgerIcon.on('click', function hamburgerAction() {
          $mainMenu.addClass('open');
          $body.addClass('js-menu-is-open');
        });

        $closeMenuIcon.on('click', function closeMenuAction() {
          $mainMenu.removeClass('open');
          $body.removeClass('js-menu-is-open');
        });

        $expandableItem.on('click', function expandItem(event) {
          const $itemParent = $(event.target).parent();
          // closeSearch();
          if ($itemParent.hasClass('opened')) {
            $itemParent.removeClass('opened');
          } else {
            $expandableItem.parent().removeClass('opened')
            $itemParent.addClass('opened');
          }
        });
      }
    }
  };
})(jQuery, Drupal);