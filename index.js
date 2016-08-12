'use strict';

let express = require('express'),
	fs = require('fs'),
	app = express(),
	http = require('http').Server(app);

app.use(express.static(__dirname + '/dist/'));

fs.readFile('stage.html', 'utf8', function(err, data){
	app.get('/', function(req, res) {
		res.send(data);
	});
});

http.listen(3000, function(){
	console.log('Listening at port 3000');
});