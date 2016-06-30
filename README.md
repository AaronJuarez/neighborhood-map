# Neighborhood Map

### To run
---------------------------
- Download or fork the application from [here](https://github.com/AaronJuarez/neighborhood-map)
- Select ```index.html``` to start the app
- You can find a version of the app running [here](http://aaronjuarez.github.io/neighborhood-map/)

### Running Grunt
----------------------------
[Installing Grunt](http://gruntjs.com/getting-started)

You will also need to install the following plugings:

- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)

```
npm install grunt-contrib-uglify --save-dev
```

- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)

```
npm install grunt-contrib-cssmin --save-dev
```

- [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin)

```
npm install grunt-contrib-htmlmin --save-dev
```

- [grunt-pagespeed](https://www.npmjs.com/package/grunt-pagespeed)

```
npm install grunt-pagespeed --save-dev
```

Alternatively use load-grunt-tasks to load your plugins.

- [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)

```
npm install --save-dev load-grunt-tasks
```

```
require('load-grunt-tasks')(grunt);
```


### Flickr & Wikipedia
---------------------------------------
Additional info of this app is obtained via asynchronous requests to [Flickr](https://www.flickr.com/) and [Wikipedia](https://www.wikipedia.org/) API's
