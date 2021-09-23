!((document, Drupal, $) => {
    'use strict';
  
    /**
     * Setup and attach the Share link behaviors.
     *
     * @type {Drupal~behavior}
     */
    Drupal.behaviors.shareButton = {
        attach: function(context) {
            console.log('clcik-log');
            if ($(context).is(document)) {
                $('.share-button img').on('click', function(){
                    console.log('clcik');
                    $('#linksDropdown').toggleClass('share-links-open');
                })
            }

        }
    };
  })(document, Drupal, jQuery);
