
var app = app || {};

(function () {
	'use strict';

	app.Place = function(data) {

		this.name = ko.observable(data.name);
		this.description = ko.observable(data.description);
		this.displayed = ko.observable(data.displayed);

	};

})();
