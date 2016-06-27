var app = app || {};

(function () {
	'use strict';

	app.ViewModel = function() {
		var self = this;

		app.placeCollection.placesData.forEach(function(placeElem) {
			app.placeCollection.allPlaces.push(new app.PlaceModel.Place(placeElem));
		});

		this.placesList = ko.observableArray(app.placeCollection.allPlaces);

		this.initialMarkPlaces = function(){
			app.MapView.searchLocations(app.placeCollection.allPlaces);
		};

		window.addEventListener('load', function() {
			self.initialMarkPlaces();
		});

		this.toggleNav = function() {
			app.AppView.menuDisplay();
		};

		this.filtered = app.PlaceModel.filteredPlace;

		this.filter = function() {
			var input = app.PlaceModel.filteredPlace().toLowerCase();

			app.placeCollection.allPlaces.forEach(function(element) {
		    	if (element.isActive === true) {
		    		element.marker.toggleMarkerAction();
		    	};
		    });

			app.placeCollection.removedPlaces.forEach(function(elem) {
				elem.marker.setMap(app.map);
				self.placesList.push(elem);
			});

			app.placeCollection.removedPlaces = [];

			self.placesList().forEach(function(place) {
				var name = place.name.toLowerCase();
				if (!name.includes(input)) {
					place.marker.setMap(null);
					app.placeCollection.removedPlaces.push(place);
				}
			});

			app.placeCollection.removedPlaces.forEach(function(elem) {
				self.placesList.remove(elem);
			});
		};

		this.clickedListElem = function(element) {
			element.marker.toggleMarkerAction();
		};

		this.showInfo = function() {
			var placeName = $('#info-button').prev().text();
			$('#placeInfoTitle').text(placeName);
			app.AppView.getFlickrImg(placeName);
			app.AppView.getWikipediaArticle(placeName);
		};

		this.deleteInfo = function() {
			$('#placeInfoTitle').empty();
			$('#flickr').empty();
			$('#wikipedia-links').empty();
		};

	};

	ko.applyBindings(new app.ViewModel());

})();