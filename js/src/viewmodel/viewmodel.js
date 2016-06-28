
var app = app || {};

(function () {
	'use strict';

	app.ViewModel = function() {
		var self = this;

		//build a place object for each place based on collections data
		app.placeCollection.placesData.forEach(function(placeElem) {
			app.placeCollection.allPlaces.push(new app.PlaceModel.Place(placeElem));
		});

		//make an observable array to handle list filter display
		this.placesList = ko.observableArray(app.placeCollection.allPlaces);

		//initial display of markers, all initial places
		this.initialMarkPlaces = function(){
			app.MapView.searchLocations(app.placeCollection.allPlaces);
		};

		//Set initial markers on load
		window.addEventListener('load', function() {
			self.initialMarkPlaces();
		});

		//toggle nav sidebar classes to show or hide sidebar menu
		this.toggleNav = function() {
			app.AppView.menuDisplay();
		};

		//Sting to filter
		this.filtered = app.PlaceModel.filteredPlace;

		//function that filters list elements by adding places that doesnt match
		//the filtered variable to the removedPlaces array
		this.filter = function() {
			var input = app.PlaceModel.filteredPlace().toLowerCase();

			this.reset();

			self.placesList().forEach(function(place) {
				var name = place.name.toLowerCase();
				if (!name.includes(input)) {
					//removes marker from the map
					place.marker.setMap(null);
					app.placeCollection.removedPlaces.push(place);
				}
			});

			//remove not wanted elements from the placesList observable array
			app.placeCollection.removedPlaces.forEach(function(elem) {
				self.placesList.remove(elem);
			});
		};

		//function that reset all places on the list, adding the removed places
		// to the observable array
		this.reset = function() {

			//if marker is active, call toggleMarkerAction to remove button
			//and animation from marker and marker infoWindow
			app.placeCollection.allPlaces.forEach(function(element) {
		    	if (element.isActive === true) {
		    		element.marker.toggleMarkerAction();
		    	}
		    });

			//add place objects from removedPlaces array
			app.placeCollection.removedPlaces.forEach(function(elem) {
				//adds marker to the map
				elem.marker.setMap(app.map);
				self.placesList.push(elem);
			});
			app.placeCollection.removedPlaces = [];
		};

		//funtion called when a list element or a marker is clicked
		this.clickedListElem = function(element) {
			app.AppView.hideSidebar();
			element.marker.toggleMarkerAction();
		};

		//function to show place info on modal, when marker button is clicked
		this.showInfo = function() {
			var placeName = $('#info-button').prev().prev().text();
			$('#placeInfoTitle').text(placeName);
			app.AppView.getFlickrImg(placeName);
			app.AppView.getWikipediaArticle(placeName);
		};

		//function to reset modal, deletes the info
		this.deleteInfo = function() {
			$('#placeInfoTitle').empty();
			$('#flickr').empty();
			$('#wikipedia-links').empty();
		};

	};

	ko.applyBindings(new app.ViewModel());

})();