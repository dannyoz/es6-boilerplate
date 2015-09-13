var express = require('express'),
    swig = require('swig'),
    http = require('http');

var app = express();
var server = app.listen(4000);
var routeData = require('./app/routes.json');


//Templating settings
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/build/views');

//For static asset files
['css', 'img', 'js', 'views', 'api', 'msg'].forEach(function (dir){
    app.use('/'+dir, express.static(__dirname+'/build/'+dir));
});

routeData.routes.forEach(function (route){

	app.get(route.path, function(req, res) {
		res.render(route.view, {
		    pageTitle : route.title
		});
	});
	
});

app.get('/api',function(req,res){

	var json = require('./app/api/test.json');

	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(json));
});

console.log("Express server listening on port 4000");