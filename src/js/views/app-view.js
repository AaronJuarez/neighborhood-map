
var app = app || {};

(function ($) {
	'use strict';

	app.AppView = {

		//function to display menu side bar
		menuDisplay: function() {
			if (window.innerWidth >= 800) {
				$('#sidebar').toggleClass('nav-close');
			} else {
				$('#sidebar').toggleClass('nav-open');
			}
		},

		//function to hide sidebar menu when list element is selected
		//and width is less than 800, otherwise it will obstruct the view
		hideSidebar: function() {
			if (window.innerWidth < 800) {
				$('#sidebar').toggleClass('nav-open');
			}
		},

		flickrData: ko.observable(''),

		wikipediaData: ko.observable(''),

		//function to get flickr image
    	getFlickrImg: function(place) {
    		//https://www.flickr.com/services/api/flickr.photos.search.htm
    		//https://www.flickr.com/services/api/misc.urls.html
    		place = place.replace(/ /g, '+');
    		var flickrUrl = 'https://api.flickr.com/services/rest/?method=' +
    		'flickr.photos.search&api_key=a11e9fccfcfb19ef18a46c3872a214a4&' +
    		'user_id=141904481%40N02&text=' + place +
    		'&format=json&nojsoncallback=1';

    		$.getJSON(flickrUrl, function(data) {
    			if (data.stat === 'fail') {
    				app.AppView.flickrData('Flicker image could not be loaded');
    				return;
    			}

    			var photo = data.photos.photo[0];
    			var flickrImg = '<img class="flickr-img img-responsive" ' +
    			'src="https://farm' + photo.farm + '.staticflickr.com/' +
    			photo.server + '/' + photo.id + '_' + photo.secret + '.jpg">' +
    			'<figcaption>Image powered by Flickr</figcaption>';

    			app.AppView.flickrData(flickrImg);


    		}).fail(function(e) {
            	app.AppView.flickrData('Flicker image could not be loaded');
    		});

    	},

    	//function to get wikipedia articles
    	getWikipediaArticle: function(place) {

		    $.ajax('https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
		    	place + '&format=json&callback=wikiCallback', {
		        dataType: 'jsonp'
		    }).done(function(data) {
		    	var articles = data[1],
		    		webUrls = data[3],
		    		links = '';

		    	if (data[0] === '') {
		    		app.AppView.wikipediaData('No data found');
		    		return;
		    	};

		    	for (var i = 0; i < articles.length; i++) {
		    		links = links + '<li><a href=' + webUrls[i] +
		    			' target="_blank">' + articles[i] + '</a></li>';
		    	}
		    	app.AppView.wikipediaData(links);

		    }).fail(function() {
		    	app.AppView.wikipediaData('Failed to get wikipedia resources');
		    });

    	}
	};

})(jQuery);
