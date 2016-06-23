var app = app || {};

(function () {
	'use strict';

	app.ViewModel = function() {
		var self = this;

		app.placesData.forEach(function(placeElem) {
			app.allPlaces.push(new app.PlaceModel.Place(placeElem));
		});

		this.placesList = ko.observableArray(app.allPlaces);

		this.markPlaces = function(){
			app.markedPlaces = [];
			self.placesList().forEach(function(elem) {
				app.markedPlaces.push(elem.name);
			});
			app.MapView.searchLocations(app.markedPlaces);
		};

		window.addEventListener('load', function() {
			self.markPlaces();
		});

		this.toggleNav = function() {
			app.AppView.menuDisplay();
		};

		this.filter = function() {
			var input = app.PlaceModel.filteredPlace().toLowerCase();

			app.removedPlaces.forEach(function(elem) {
				self.placesList.push(elem);
			});

			app.removedPlaces = [];

			self.placesList().forEach(function(place) {
				var currentPlace = place;
				var name = currentPlace.name.toLowerCase();
				if (!name.includes(input)) {
					app.removedPlaces.push(currentPlace);
				}
			});

			app.removedPlaces.forEach(function(elem) {
				self.placesList.remove(elem);
			});
		};

		this.filtered = app.PlaceModel.filteredPlace;

	};

	ko.applyBindings(new app.ViewModel());

})();