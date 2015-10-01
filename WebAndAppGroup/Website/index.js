var express = require('express');
var app = express();
var port = 8080;


app.use(express.static('public'));

//var htmlDir = require('path').join(__dirname, '/html');
//app.use(express.static(htmlDir));

 //Defining url directories
app.get('/', function(req, res) {
    res.sendfile('./views/index.html');
});
 
app.get('/login', function(req, res) {
    res.sendfile('./views/login.html');
});


console.log("Listening on port " + port + "...");
app.listen(port);