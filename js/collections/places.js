/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	app.placeCollection = {

		placesData: [
			{
				name: 'Torre Axa Mexico',
				description: 'The Tower has a height of 132 meters (433 ft) and 30-32 floors, plus 5 floors of parking underground'
			},
			{
				name: 'Torre Reforma',
				description: 'The Torre Reforma is a Mexico City skyscraper with a height of 800.5 feet (244.0 m) to the roof' +
				 'and housing 57 stories, in 2016 it became the tallest skyscraper in Mexico'
			},
			{
				name: 'World Trade Center Mexico City',
				description: 'The complex also includes a convention center, cultural center, parking facilities, a multi-screen' +
				 'cinema, a revolving 45th-floor luxury restaurant, and shopping center '
			},
			{
				name: 'Torre Mayor',
				description: 'Torre Mayor is one of the strongest buildings on Earth in terms of earthquake resistance, being' +
				 'designed to withstand earthquakes measuring 8.5 on the Richter Scale. '
			},
			{
				name: 'Torre BBVA Bancomer',
				description: 'Upon its completion in 2015 it became the second tallest building in Mexico City at 235' +
				 'metres (771 ft) and 50 stories high'
			}
		],

		allPlaces: [],

		markedPlaces: [],

		removedPlaces: []

	};

})();
