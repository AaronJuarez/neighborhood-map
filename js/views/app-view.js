
var app = app || {};

(function ($) {
	'use strict';

	app.AppView = {

		menuDisplay: function() {
			if (window.innerWidth >= 800) {
				$('#sidebar').toggleClass('nav-close');
				console.log('nav-close toggled');
			} else {
				$('#sidebar').toggleClass('nav-open');
				console.log('nav-open toggled');
			}
		},

    	getFlickrImg: function(place) {

    		var flickrUrl = 'https://api.flickr.com/services/rest/?method=' +
    		'flickr.photos.search&api_key=4d7a58bd0277a20e2d2c17bfab0ff142&' +
    		'text=' + place + '&min_upload_date=2015-01-01&min_taken_date=2015-' +
    		'01-01&media=photos&lat=19.411207&lon=-99.1505385&format=json&nojsoncallback=1';

    		$.getJSON(flickrUrl, function(data) {
    			console.log(data);
    			var photo = data.photos.photo[0];
    			var flickrImg = '<img src="https://farm' + photo.farm + '.staticflickr.com/' +
    			photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg">';

    			$('#flickr-img').append(flickrImg);

    		});

    	},

    	getWikipediaArticle: function(place) {

    		var wikiRequestTimeout = setTimeout(function() {
    			$('#wikipedia-links').text('Failed to get wikipedia resources');
    		}, 8000);

		    $.ajax('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + place + '&format=json&callback=wikiCallback', {
		        dataType: 'jsonp'
		    }).done(function(data) {
		    	var articles = data[1];
		    	var webUrls = data[3];

		    	for (var i = 0; i < articles.length; i++) {
		    		$('#wikipedia-links').append('<li><a href=' + webUrls[i] + ' target="_blank">' + articles[i] + '</a></li>');
		    	};

		    	clearTimeout(wikiRequestTimeout);
		    });

    	}
	};

})(jQuery);
