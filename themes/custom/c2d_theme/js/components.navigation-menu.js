(function mainMenu($, Drupal) {
  Drupal.behaviors.mainmenu = {
    attach: function attach(context) {
      if ($(context).is(document)) {
        var $hamburgerIcon = $(context).find('.hamburger');
        var $closeMenuIcon = $(context).find('.close-menu');
        var $mainMenu = $(context).find('.menu--main');
        var $expandableItem = $(context).find('.menu-item--expanded .js-dropdown-arrow');
        var $body = $('body');
        $hamburgerIcon.on('click', function () {
          $mainMenu.addClass('open');
          $body.addClass('js-menu-is-open');
        });
        $closeMenuIcon.on('click', function () {
          $mainMenu.removeClass('open');
          $body.removeClass('js-menu-is-open');
        });
        $expandableItem.on('click', function (event) {
          var $itemParent = $(event.target).parent();
          // closeSearch();
          if ($itemParent.hasClass('opened')) {
            $itemParent.removeClass('opened');
          } else {
            $expandableItem.parent().removeClass('opened');
            $itemParent.addClass('opened');
          }
        });
      }
    }
  };
})(jQuery, Drupal);
//# sourceMappingURL=components.navigation-menu.js.map
