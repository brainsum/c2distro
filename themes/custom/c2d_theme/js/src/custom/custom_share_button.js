(function shareButton($, Drupal) {
  Drupal.behaviors.sharebutton = {
    attach: function (context) {
      if ($(context).is(document)) {
          $('.share-button').on('click', function(){
              $('.rrssb').toggleClass('rrssb-show');
          })
      }
    }
  };
})(jQuery, Drupal);
