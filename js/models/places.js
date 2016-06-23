
var app = app || {};

(function () {
	'use strict';

	app.PlaceModel = {

		Place: function(data) {
			this.name = data.name;
			this.description = data.description;
		},

		filteredPlace: ko.observable('')

	};

})();
