(function shareButton($, Drupal) {
  Drupal.behaviors.sharebutton = {
    attach: function (context) {
      if ($(context).is(document)) {
        console.log('clcik-log');
        $('.share-button img').on('click', function(){
          console.log('clcik');
          $('.rrssb').toggleClass('rrssb-show');
        })

      }
    }
  };
})(jQuery, Drupal);
