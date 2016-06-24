var app = app || {};

(function () {
	'use strict';

	app.ViewModel = function() {
		var self = this;

		app.placeCollection.placesData.forEach(function(placeElem) {
			app.placeCollection.allPlaces.push(new app.PlaceModel.Place(placeElem));
		});

		this.placesList = ko.observableArray(app.placeCollection.allPlaces);

		this.markPlaces = function(){
			app.placeCollection.markedPlaces = [];
			self.placesList().forEach(function(elem) {
				app.placeCollection.markedPlaces.push(elem.name);
			});
			app.MapView.searchLocations(app.placeCollection.markedPlaces);
		};

		window.addEventListener('load', function() {
			self.markPlaces();
		});

		this.toggleNav = function() {
			app.AppView.menuDisplay();
		};

		this.filter = function() {
			var input = app.PlaceModel.filteredPlace().toLowerCase();

			app.placeCollection.removedPlaces.forEach(function(elem) {
				self.placesList.push(elem);
			});

			app.placeCollection.removedPlaces = [];

			self.placesList().forEach(function(place) {
				var currentPlace = place;
				var name = currentPlace.name.toLowerCase();
				if (!name.includes(input)) {
					app.placeCollection.removedPlaces.push(currentPlace);
				}
			});

			app.placeCollection.removedPlaces.forEach(function(elem) {
				self.placesList.remove(elem);
			});
		};

		this.filtered = app.PlaceModel.filteredPlace;

	};

	ko.applyBindings(new app.ViewModel());

})();