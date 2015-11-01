//Load modules
var express = require('express');
var colors = require('colors');
var jquery = require('jquery');

var app = express();
var port = 8000;

//Where html documents grab stuff for the site
app.use(express.static('public'));

//Defining url directories
//Default Directory
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
//Login Directory
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
    var userName, password; //No idea how this will work yet.
});
//Player Debug Directory
app.get('/playerDebug', function(req, res) {
    res.sendFile(__dirname + '/views/playerDebug.html');
});

app.listen(port);
console.log(colors.magenta('Audio site listening on port ' + port));

