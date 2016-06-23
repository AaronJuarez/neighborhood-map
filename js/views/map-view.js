/*map key AIzaSyC1EEikoLnM-dAlA5V_q1esMQhi7HUpG0M*/
var app = app || {};

(function () {
	'use strict';

	app.map;
	app.service;

    app.MapView = {

    	self: this,

    	initMap: function() {
	        app.map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: 19.4119984, lng: -99.1691486},
	          zoom: 14
	        });
    	},

    	createMarker: function(placeData) {
    		var marker = new google.maps.Marker({
		      map: app.map,
		      position: placeData.geometry.location,
		      title: name
		    });
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
