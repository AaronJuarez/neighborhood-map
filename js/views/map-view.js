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

    	createMarker: function(placeData, place) {
		    var lat = placeData.geometry.location.lat();
		    var lon = placeData.geometry.location.lng();
		    var name = placeData.name;
		    var bounds = app.mapBounds;

    		place.marker = new google.maps.Marker({
		      map: app.map,
		      animation: google.maps.Animation.DROP,
		      position: placeData.geometry.location,
		      title: name
		    });

		    var infoWindow = new google.maps.InfoWindow({
		      content: '<div id="info-button-div" class="map-info-window"></div>',
		      maxWidth: 250
		    });

		    place.marker.toggleMarkerAction = function() {

		    	app.placeCollection.allPlaces.forEach(function(element) {
		    		if (element !== place && element.isActive === true) {
		    			element.marker.toggleMarkerAction();
		    		};
		    	});

		    	if (place.isActive === true) {
			    place.marker.setAnimation(null);
			    $('#info-button').appendTo('#button-holder');
			    infoWindow.close();
			    place.isActive = false;
			  } else {
			    place.marker.setAnimation(google.maps.Animation.BOUNCE);
			    infoWindow.open(map, place.marker);

			    if (place.isMarkerNamed === false) {
			    	place.isMarkerNamed = true;
			    	$('#info-button-div').append('<h3>' + place.name + '</h3>');
			    };

			    $('#info-button').appendTo('#info-button-div');
			    place.isActive = true;
			  }
			};

			google.maps.event.addListener(place.marker, 'click', place.marker.toggleMarkerAction);
			google.maps.event.addListener(infoWindow,'closeclick', place.marker.toggleMarkerAction);

			//place.marker.addListener('click', place.marker.toggleMarkerAction);

		    bounds.extend(new google.maps.LatLng(lat, lon));
		    app.map.fitBounds(bounds);
		    app.map.setCenter(bounds.getCenter());

    	},

    	searchLocations: function(locations) {
    		app.service = new google.maps.places.PlacesService(app.map);

    		locations.forEach(function(place) {
    			var request = {
        			query: place.name
      			};
    			app.service.textSearch(request, function(results, status) {
    				if (status == google.maps.places.PlacesServiceStatus.OK) {
					    app.MapView.createMarker(results[0], place);
					}else {
						console.log('something went wrong with request');
						console.log(status);
					}
    			});
    		});
    	}

	};

})();
