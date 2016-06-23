
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

		resizeNavState: function() {
			console.log('resizeNavState');
			if (window.innerWidth >= 800) {
				$('#sidebar').removeClass('nav-open');
				console.log('nav-open removed');
			} else {
				$('#sidebar').removeClass('nav-close');
				console.log('nav-close removed');
			}

		}
	};

})(jQuery);
