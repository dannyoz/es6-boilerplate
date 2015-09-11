var express = require('express'),
    swig = require('swig'),
    http = require('http');

var app = express();
var server = app.listen(4000);

//Templating sttings
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/build/views');

//For static asset files
//app.use(express.static(__dirname + '/build'));

['css', 'img', 'js', 'views', 'api', 'msg'].forEach(function (dir){
    app.use('/'+dir, express.static(__dirname+'/build/'+dir));
});



app.get('/', function(req, res) {
	//res.sendFile('./build/index.html');

	res.render('home', {
	    pagename: 'awesome people',
	    authors: ['Davie gs', 'Jim', 'Jane']
	});
});

app.get('/admin', function(req, res) {

	res.render('admin', {
	    pagename: 'awesome people',
	    authors: ['Davie gs', 'Jim', 'Jane']
	});

});

app.get('/api',function(req,res){

	var json = require('./app/api/test.json');

	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(json));
});

console.log("Express server listening on port 4000");