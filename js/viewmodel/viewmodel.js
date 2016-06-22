var app = app || {};

(function () {
	'use strict';

	app.ViewModel = function() {
		var self = this;

		this.placesList = ko.observableArray([]);

		app.placesArray.forEach(function(placeElem) {
			self.placesList.push(new app.Place(placeElem));
		});

		console.log(app.placesArray);
		console.log(self.placesList());

	};

	ko.applyBindings(new app.ViewModel());

})();