module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    uglify: {
      js: {
        files: {
          'dist/js/collections/places.js': ['src/js/collections/places.js'],
          'dist/js/models/places.js': ['src/js/models/places.js'],
          'dist/js/viewmodel/viewmodel.js': ['src/js/viewmodel/viewmodel.js'],
          'dist/js/views/app-view.js': ['src/js/views/app-view.js'],
          'dist/js/views/map-view.js': ['src/js/views/map-view.js']
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
          'dist/index.html': 'src/index.html'         // 'destination': 'source'
        }
      }
    },

    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.css'
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