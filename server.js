var express = require('express'),
    http = require('http');

var app = express();
var server = app.listen(4000);

//For static asset files
app.use(express.static(__dirname + '/build'));

app.all('*', function(req, res) {
    res.sendfile('./build/index.html');
});

console.log("Express server listening on port 4000");