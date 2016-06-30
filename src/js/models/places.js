
var app = app || {};

(function () {
	'use strict';

	app.PlaceModel = {

		//place object
		Place: function(data) {
			this.name = data.name;
			this.description = data.description;
			this.marker = {};
			this.isActive = false;
		}

	};

})();
