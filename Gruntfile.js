module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    uglify: {
      js: {
        files: {
          'js/dist/collections/places.min.js': ['js/src/collections/places.js'],
          'js/dist/models/places.min.js': ['js/src/models/places.js'],
          'js/dist/viewmodel/viewmodel.min.js': ['js/src/viewmodel/viewmodel.js'],
          'js/dist/views/app-view.min.js': ['js/src/views/app-view.js'],
          'js/dist/views/map-view.min.js': ['js/src/views/map-view.js'],
        }
      }
    },

    htmlmin: {                                     // Task
      main: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'index.html': 'index-src.html'         // 'destination': 'source'
        }
      }
    },

    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'css/src',
          src: ['*.css', '!*.min.css'],
          dest: 'css/dist',
          ext: '.min.css'
        }]
      }
    },

    pagespeed: {
      options: {
        nokey: true,
        url: "http://aaronjuarez.github.io/neighborhood-map/"
      },
      prod: {
        options: {
          url: "http://aaronjuarez.github.io/neighborhood-map/",
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      },
      paths: {
        options: {
          paths: [],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      }
    }

  });

  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);
  grunt.registerTask('speed', ['pagespeed']);

};