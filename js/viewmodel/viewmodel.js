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
			console.log(element.marker);
			if (element.isActive === false && element.isWikiCharged === false) {
				app.MapView.getWikipediaArticle(element.name);
				element.isWikiCharged = true;
			};
			element.isActive = !element.isActive;
		};

	};

	ko.applyBindings(new app.ViewModel());

})();