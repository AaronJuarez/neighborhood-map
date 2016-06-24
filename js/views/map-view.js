/*map key AIzaSyC1EEikoLnM-dAlA5V_q1esMQhi7HUpG0M*/
var app = app || {};

(function () {
	'use strict';

	app.map;
	app.service;
	app.mapBounds;

    app.MapView = {

    	self: this,

    	initMap: function() {
	        app.map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: 19.4119984, lng: -99.1691486},
	          zoom: 14
	        });

	        app.mapBounds = new google.maps.LatLngBounds();

	        window.addEventListener('resize', function(e) {
			  app.map.fitBounds(app.mapBounds);
			});
    	},

    	createMarker: function(placeData) {
		    var lat = placeData.geometry.location.lat();
		    var lon = placeData.geometry.location.lng();
		    var name = placeData.formatted_address;
		    var bounds = app.mapBounds;

    		var marker = new google.maps.Marker({
		      map: app.map,
		      animation: google.maps.Animation.DROP,
		      position: placeData.geometry.location,
		      title: name
		    });

		    marker.addListener('click', toggleBounce);

		    function toggleBounce() {
			  if (marker.getAnimation() !== null) {
			    marker.setAnimation(null);
			  } else {
			    marker.setAnimation(google.maps.Animation.BOUNCE);
			  }
			}

		    var infoWindow = new google.maps.InfoWindow({
		      content: marker.title
		    });

		    google.maps.event.addListener(marker, 'click', function() {
		      infoWindow.open(map, marker);
		    });

		    bounds.extend(new google.maps.LatLng(lat, lon));
		    app.map.fitBounds(bounds);
		    app.map.setCenter(bounds.getCenter());
    	},

    	callback: function(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
			    app.MapView.createMarker(results[0]);
			}else {
				console.log('something went wrong with request');
				console.log(status);
			}
    	},

    	searchLocations: function(locations) {
    		app.service = new google.maps.places.PlacesService(app.map);

    		locations.forEach(function(place) {
    			var request = {
        			query: place
      			};
    			app.service.textSearch(request, app.MapView.callback);
    		});
    	}

	};

})();
