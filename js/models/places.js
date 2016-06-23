
var app = app || {};

(function () {
	'use strict';

	app.Place = function(data) {

		this.name = data.name;
		this.description = data.description;
		this.displayed = ko.observable(data.displayed);

	};

})();
