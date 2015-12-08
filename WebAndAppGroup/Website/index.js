//Load modules
var express = require('express');
var colors = require('colors');
var jquery = require('jquery');
var mysql = require('mysql');
var http = require('http');

var app = express();
var port = 8000;

var pool = mysql.createPool({
    host     : 'rei.cs.ndsu.nodak.edu',
    user     : 'csci413f15_1',
    password : 'F9UnP31c',
    database : 'csci413f15_1',
    debug    :  false
});


console.log("Grabbing public resources...");
//Where html documents grab stuff for the site
app.use(express.static('public'));

console.log("Adding view directories...");
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

var server = app.listen(port);
console.log(colors.magenta('Success! Audio site listening on port ' + port));
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    //socket.emit('message', {'message': 'hello world'});
	
	socket.on('searchQuery', function(data){
		console.log("Got your message");
		var query = 'SELECT * FROM SONGS, ALBUMS, ARTISTS, GENRES WHERE (SONGS.albumID = ALBUMS.albumID AND ALBUMS.artistID = ARTISTS.artistID AND SONGS.genreID = GENRES.genreID) AND (title LIKE "%' + data.message + '%" OR artist LIKE "%' + data.message + '%" OR album LIKE "%' + data.message + '%" OR genre LIKE "%' + data.message + '%")';
		console.log(query);
		
		pool.getConnection(function(error,connection){
			if (error) {
			  console.log("error connecting to the database");
			}

			connection.query(query, function(error,results,fields){
				connection.release();
				if(!error) {
					//console.log(results);
					var results4 = [results[0], results[1], results[2], results[3]]
					socket.emit('searchResult', {'message': results4});
				}
			});
		});
    });
});