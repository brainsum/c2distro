
(function ($, Drupal) {
    // Locations page google map script
    Drupal.behaviors.locationsMap = {
      attach: function (context, settings) {
        if (context === document) {
          let map, mapCenter, mapZoom, autoZoom, mapData;
          mapData = settings.geodata.geoData.mapData;
          autoZoom = false;

          if (settings.map_full) { // just on front and where we work page
            mapCenter = {lat: 17.292512, lng: 19.039215};
            mapZoom = 2;
          } else if (mapData) { // use zoom and coordinates is available.
            mapCenter = {
              lat: parseFloat(mapData.center[0]),
              lng: parseFloat(mapData.center[1])
            };
            mapZoom = parseInt(mapData.zoom);
          } else { // auto zoom if zoom and coordinates are empty.
            autoZoom = true;
          }

          function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
              zoom: mapZoom,
              center: mapCenter,
              zoomControl: true,
              zoomControlOptions: {
                  position: google.maps.ControlPosition.LEFT_CENTER
              },
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
              styles:[ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": "#dddddd" }, { "visibility": "on" }, { "weight": 1 } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#dddddd" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ]
              });

            // add styles to active countries
            function newStyle() {
              map.data.setStyle(function(feature) {
                var isActive = feature.getProperty('active');
                var color = '#d24744';
                var higher = isActive ? 10 : 1;
                return {
                  fillColor: color,
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: '#9E9E9E',
                  zIndex: higher
                };
              });
            }
            newStyle();

            // draw the active country poligons
            map.data.addGeoJson(settings.geodata.geoData);

            let data;
            function getCountry(arr) {
              $(Object.values(arr)).each(function (i, item) {
                if (typeof item === "object" && item.countryName) {
                  data = Object.values(arr)[i];
                }
              });
              return data;
            }

            // zoom to actual country
            if (autoZoom) {
              let geocoder = new google.maps.Geocoder();
              let bounds = new google.maps.LatLngBounds();
              let counter = 0;
              let country;
              map.data.forEach(function (feature) { //todo check this counter code, maybe it's too complicated yet
                counter++;
                country = getCountry(feature);
                geocoder.geocode({'address': country.countryName}, function (results, status) {
                  if (status === google.maps.GeocoderStatus.OK) {
                    bounds.extend(results[0].geometry.location);
                    if (counter < 2) {
                      map.setCenter(results[0].geometry.location);
                      map.fitBounds(results[0].geometry.viewport);
                    }
                    else {
                      map.setCenter(bounds.getCenter());
                      map.fitBounds(bounds);
                    }
                  }
                });
              });
            }

            if (settings.map_popup) {
              // hovering effects on active countries
              map.data.addListener('mouseover', function(event) {
                map.data.overrideStyle(event.feature, {fillOpacity: 0.8});
              });

              map.data.addListener('mouseout', function(event) {
                map.data.overrideStyle(event.feature, {fillOpacity: 1});
              });
              // init infoWindows on map page
              var infowindowCollection = []; //it's needed to close all infoWindow on clicks
              map.data.addListener('click', function (mapsMouseEvent) {
                getCountry(mapsMouseEvent.feature);
                // generate content
                var contentString =
                  '<div class="iw-modal" id="content_' + data.countryName + '">' +
                  '<div class="iw-modal__content">' +
                  '<p class="iw-modal__heading">' + data.countryName + '</p>' +
                  '<div class="iw-modal__locations">' + data.countryDescription + '</div>' +
                  '<a class="iw-modal__to-contact" href="' + data.link + '">' + Drupal.t("Visit country") + '</a>' +
                  '</div></div>';

                var infoWindow = new google.maps.InfoWindow({
                  position: mapsMouseEvent.latLng,
                  content: contentString,
                  maxWidth: 280,
                })
                if (infowindowCollection.length) {
                  infowindowCollection[0].close();
                  infowindowCollection.shift();
                }
                infowindowCollection.push(infoWindow);
                infoWindow.open(map);
              });

              google.maps.event.addListener(map, 'click', function() {
                if (infowindowCollection.length) {
                  infowindowCollection[0].close();
                  infowindowCollection.shift();
                }
              })
            }
          }
          initMap();
        }
      }
    };
})(jQuery, Drupal);
