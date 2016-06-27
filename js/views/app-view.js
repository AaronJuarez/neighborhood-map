
var app = app || {};

(function ($) {
	'use strict';

	app.AppView = {

		menuDisplay: function() {
			if (window.innerWidth >= 800) {
				$('#sidebar').toggleClass('nav-close');
			} else {
				$('#sidebar').toggleClass('nav-open');
			}
		},

    	getFlickrImg: function(place) {
    		//https://www.flickr.com/services/api/flickr.photos.search.htm
    		//https://www.flickr.com/services/api/misc.urls.html
    		console.log(place);
    		place = place.replace(/ /g, '+');
    		console.log(place);
    		var flickrUrl = 'https://api.flickr.com/services/rest/?method=' +
    		'flickr.photos.search&api_key=4f6d1b92ad1230b34eff886862483510&' +
    		'user_id=141904481%40N02&text=' + place + '&format=json&nojsoncallback=1';

    		$.getJSON(flickrUrl, function(data) {
    			var photo = data.photos.photo[0];
    			var flickrImg = '<img class="flickr-img img-responsive" src="https://farm' + photo.farm + '.staticflickr.com/' +
    			photo.server + '/' + photo.id + '_' + photo.secret + '.jpg">' +
    			'<figcaption>Image powered by Flickr</figcaption>';

    			$('#flickr').append(flickrImg);

    		}).fail(function(e) {
            	$('#flickr').text('Flicker image could not be loaded');
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
