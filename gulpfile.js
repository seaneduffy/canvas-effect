'use strict';

let gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	watchify = require('watchify');

gulp.task('flame', function(){
	var props = {entries: ['./src/flame.js']};
	var bundler = watchify(browserify(props));
	
	function rebundle() {
    	
    	var stream = bundler.bundle();
    	
    	return stream.pipe(source('flame.js')).pipe(gulp.dest('./dist'));
	}

	bundler.on('update', function() {
		rebundle();
	});

  return rebundle();
})