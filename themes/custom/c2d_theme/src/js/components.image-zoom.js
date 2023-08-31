'use strict';

(function imageZoom(once) {
  Drupal.behaviors.imageZoom = {
    attach: function (context) {

      once('image-zoom', '.image-zoom .media--type-image', context).forEach(image => {
        lightGallery(image, {
          selector: '.image-style-large',
          plugins: [lgMediumZoom],
          mode: 'lg-fade',
          closeOnTap: true,
          licenseKey: 'B56A86B9-A47B4CCC-8360AF3A-F527965C',
        });
      });
    }
  };
})(once);
