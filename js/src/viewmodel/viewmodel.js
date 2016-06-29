
var app = app || {};

(function () {
	'use strict';

	app.thisViewModel;

	app.ViewModel = function() {
		var self = this;
		app.thisViewModel = this;

		//build a place object for each place based on collections data
		app.placeCollection.placesData.forEach(function(placeElem) {
			app.placeCollection.allPlaces.push(new app.PlaceModel.Place(placeElem));
		});

		//String to filter
		this.filteredPlace = ko.observable('');
		this.activePlace = ko.observable('');

		this.setActivePlace = function(place) {
			self.activePlace(place);
		};

		//make an observable array to handle list filter display
		//this.placesList = ko.observableArray(app.placeCollection.allPlaces);

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


		this.reset = function() {
			self.filteredPlace('');
		};

		//function that filters list elements by adding places that doesnt match
		//the filtered variable to the removedPlaces array
		this.placesList = ko.computed(function() {
			var input = this.filteredPlace().toLowerCase();

			//function that reset all places on the list, adding the removed places
			// to the observable array
			if (input === '') {

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
					app.placeCollection.allPlaces.push(elem);
				});
				app.placeCollection.removedPlaces = [];

			}else{

				//this.reset();
				app.placeCollection.allPlaces.forEach(function(place) {
					var name = place.name.toLowerCase();
					if (!name.includes(input)) {
						if (place.isActive === true) {
			    			place.marker.toggleMarkerAction();
			    		}
						//removes marker from the map
						place.marker.setMap(null);
						app.placeCollection.removedPlaces.push(place);
					}
				});

				//remove not wanted elements from the placesList observable array
				app.placeCollection.removedPlaces.forEach(function(elem) {
					var index = app.placeCollection.allPlaces.indexOf(elem);

					if (index >= 0) {
						app.placeCollection.allPlaces.splice(index, 1);
					};

				});
			}

			return app.placeCollection.allPlaces;

		}, this);

		//funtion called when a list element or a marker is clicked
		this.clickedListElem = function(element) {
			app.AppView.hideSidebar();
			element.marker.toggleMarkerAction();
		};

		//function to show place info on modal, when marker button is clicked
		this.showInfo = function() {
			var placeName = self.activePlace();
			console.log(placeName);
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