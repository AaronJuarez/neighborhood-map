/*map key AIzaSyC1EEikoLnM-dAlA5V_q1esMQhi7HUpG0M*/
var app = app || {};

(function () {
	'use strict';

	app.map;
    app.initMap = function() {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 19.4184489, lng: -99.1274314},
          zoom: 12
        });
      };

})();
