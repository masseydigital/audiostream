//Load modules
var express = require('express');
var colors = require('colors');

var app = express();
var port = 8080;


app.use(express.static('public'));


 //Defining url directories
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
 
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
});


console.log(colors.yellow("Listening on port " + port + "..."));
app.listen(port);