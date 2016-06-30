
var app = app || {};

(function () {
	'use strict';

	app.map;
	app.service;
	app.mapBounds;
	app.infoWindow;

    app.MapView = {

    	//callback function for the google maps api request
    	initMap: function() {
	        app.map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: 19.4119984, lng: -99.1691486},
	          zoom: 14
	        });

	        app.mapBounds = new google.maps.LatLngBounds();

	        window.addEventListener('resize', function(e) {
	        	app.map.fitBounds(app.mapBounds);
			});
			this.infoWindowInit();
    	},

    	infoWindowInit: function() {
    		var contentNode = $('#info-button-div');

    		app.infoWindow = new google.maps.InfoWindow({
		      content: contentNode[0],
		      maxWidth: 300
		    });

		    //handle infoWindow close event fired by clicked 'x' on window

			google.maps.event.addListener(app.infoWindow,'closeclick', function() {

				app.placeCollection.allPlaces.forEach(function(element) {
		    		if (element.isActive === true) {
		    			app.infoWindow.open(map, element.marker);
		    			element.marker.toggleMarkerAction();
		    		}
		    	});

			});

    	},

    	//create a marker given search result data and place object
    	createMarker: function(placeData, place) {
		    var lat = placeData.geometry.location.lat(),
		    	lon = placeData.geometry.location.lng(),
		    	name = placeData.name,
		    	bounds = app.mapBounds;

		    //marker binds to place object
    		place.marker = new google.maps.Marker({
		      map: app.map,
		      animation: google.maps.Animation.DROP,
		      position: placeData.geometry.location,
		      title: name
		    });

		    //function that handles marker infoWindow and marker animation
		    place.marker.toggleMarkerAction = function() {

		    	app.placeCollection.allPlaces.forEach(function(element) {
		    		if (element !== place && element.isActive === true) {
		    			element.marker.toggleMarkerAction();
		    		}
		    	});

		    	if (place.isActive === true) {
		    		app.thisViewModel.setInfoWindowName('');
			  		app.thisViewModel.setInfoWindowDescription('');
				    place.marker.setAnimation(null);
				    app.infoWindow.close();
				    place.isActive = false;
				    app.thisViewModel.setActivePlace('');


			  	} else {

				    place.marker.setAnimation(google.maps.Animation.BOUNCE);
				    app.infoWindow.open(map, place.marker);

				    place.isActive = true;
				    app.thisViewModel.setActivePlace(place.name);
				    app.thisViewModel.setInfoWindowName(place.name);
			  		app.thisViewModel.setInfoWindowDescription(place.description);
			  		app.infoWindow.close();
			  		app.infoWindow.open(map, place.marker);
				}
			};

			//function that toggles marker actions based on click event
			google.maps.event.addListener(place.marker, 'click', place.marker.toggleMarkerAction);

		    bounds.extend(new google.maps.LatLng(lat, lon));
		    app.map.fitBounds(bounds);
		    app.map.setCenter(bounds.getCenter());

    	},

    	//text search request of locations
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
						app.MapView.googleError();
						console.log('something went wrong with request ' + status);
					}
    			});
    		});
    	},

    	googleError: function() {
    		alert('Google data not loaded');
    	}

	};

})();
