var app = app || {};

(function () {
	'use strict';

	app.ViewModel = function() {
		var self = this;

		this.placesList = ko.observableArray([]);

		app.placesArray.forEach(function(placeElem) {
			self.placesList.push(new app.Place(placeElem));
		});

		self.placesList().forEach(function(elem) {
			app.displayedPlaces.push(elem.name);
		});

		window.addEventListener('load', function() {
			app.MapView.searchLocations(app.displayedPlaces);
		});

		this.toggleNav = function() {
			app.AppView.menuDisplay();
		}

	};

	ko.applyBindings(new app.ViewModel());

})();