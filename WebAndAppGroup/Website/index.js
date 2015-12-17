//Load modules
var express = require('express');
var colors = require('colors');
var jquery = require('jquery');
var mysql = require('mysql');
var http = require('http');

var app = express();
var port = 8000;

//mySQL database connection info
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
    //socket.emit('message', {'message') 'hello world'});
	
	/*When the server receives the searchQuery message from the client
	it will search the database for all applicable songs and return a list of 4 songs to the client*/
	socket.on('searchQuery', function(data){
		var query = 'SELECT songID, fileLocation, title, artist, album FROM SONGS, ALBUMS, ARTISTS, GENRES WHERE (SONGS.albumID = ALBUMS.albumID AND ALBUMS.artistID = ARTISTS.artistID AND SONGS.genreID = GENRES.genreID) AND (title LIKE "%' + data.message + '%" OR artist LIKE "%' + data.message + '%" OR album LIKE "%' + data.message + '%" OR genre LIKE "%' + data.message + '%")';

		//Connect to the database
		pool.getConnection(function(error,connection){
			if(error) {
			  console.log("error connecting to the database");
			}

			//Query the database
			connection.query(query, function(error,results,songList){
				connection.release();
				//Return 4 lists of song information to the client
				if(!error) {
					var results4 = [results[0], results[1], results[2], results[3]]
					socket.emit('searchResult', {'message' : results4});
				}
			});
		});
    });
	
	/*When the server receives the generatePlaylist message from the client
	it will search the database for all applicable songs for a playlist and return them*/
	socket.on('generatePlaylist', function(data){
		
		var songQuery = "SELECT artist, album, year, genre, duration, bpm, loudness, songKey, scale, chordsKey, chordsScale," 
               + " chordsChangesRate, chordsNumberRate, danceability, bassiness, dynamicComplexity, zeroCrossingRate,"
               + " intensity, title FROM SONGS, ARTISTS, ALBUMS, GENRES WHERE ALBUMS.albumID = SONGS.albumID"
               + " AND GENRES.genreID = SONGS.genreID AND ALBUMS.artistID = ARTISTS.artistID AND songID = " + data.message;
		
		var playlistQuery = "SELECT artist, album, year, genre, duration, bpm, loudness, songKey, scale, chordsKey, chordsScale," 
               + " chordsChangesRate, chordsNumberRate, danceability, bassiness, dynamicComplexity, zeroCrossingRate,"
               + " intensity, title, fileLocation FROM SONGS, ARTISTS, ALBUMS, GENRES WHERE ALBUMS.albumID = SONGS.albumID"
               + " AND GENRES.genreID = SONGS.genreID AND ALBUMS.artistID = ARTISTS.artistID AND songID != " + data.message;

		//Connect to the database
		pool.getConnection(function(error,connection){
			if(error) {
			  console.log("error connecting to the database");
			}
			
			//Query the database
			connection.query(songQuery, function(error,song,fields){
				if(!error) {
					
				}
				else{console.log(error);}
			
				//Query the database
				connection.query(playlistQuery, function(error,songList,fields){
					connection.release();				
					if(error) {
						console.log(error);
					}
					
					//Calculate the songs "Likeness" value
					else{
						
						weight =
						[10, //0  Artist
						  10, //1  Album
						  5,  //2  Year
						  20, //3  Genre
						  5,  //4  Duration
						  20, //5  BPM
						  5,  //6  Loudness
						  10, //7  Key
						  5,  //8  Scale
						  10, //9  Chords Key
						  5,  //10 Chords Scale
						  5,  //11 Chords Changes Rate
						  5,  //12 Chords Number Rate
						  5,  //13 Danceability
						  20,  //14 Bassiness
						  10,  //15 Dynamic Complexity
						  5,  //16 Zero Cross Rate
						  10] //17 Intensity
						var threshold = 70;
						
						var playlist = [];
						
						for(i = 0; i < songList.length; i++) {
							var score = 0;

							if(songList[i].artist == song[0].artist)
								score += weight[0];
							if(songList[i].album == song[0].album)
								score += weight[1];
							if(songList[i].year-5 <= song[0].year & (songList[i].year+5 >= song[0].year))
								score += weight[2];
							if(songList[i].genre == song[0].genre)
								score += weight[3];
							if((songList[i].duration-30 <= song[0].duration) & (songList[i].duration+30 >= song[0].duration))
								score += weight[4];
							if((songList[i].bpm*.50 <= song[0].bpm) & (songList[i].bpm*1.50 >= song[0].bpm))
								score += weight[5] * (1-(Math.abs(song[0].bpm-songList[i].bpm)/song[0].bpm));
							if((songList[i].loudness*.50 <= song[0].loudness) & (songList[i].loudness*1.50 >= song[0].loudness))
								score += weight[6] * (1-(Math.abs(song[0].loudness-songList[i].loudness)/song[0].loudness));
							if(songList[i].songKey == song[0].songKey)
								score += weight[7];
							if(songList[i].scale == song[0].scale)
								score += weight[8];
							if(songList[i].chordsKey == song[0].chordsKey)
								score += weight[9];
							if(songList[i].chordsScale == song[0].chordsScale)
								score += weight[10];
							if((songList[i].chordsChangesRate*.50 <= song[0].chordsChangesRate) & (songList[i].chordsChangesRate*1.50 >= song[0].chordsChangesRate))
								score += weight[11] * (1-(Math.abs(song[0].chordsChangesRate-songList[i].chordsChangesRate)/song[0].chordsChangesRate));
							if((songList[i].chordsNumberRate*.50 <= song[0].chordsNumberRate) & (songList[i].chordsNumberRate*1.50 >= song[0].chordsNumberRate))
								score += weight[12] * (1-(Math.abs(song[0].chordsNumberRate-songList[i].chordsNumberRate)/song[0].chordsNumberRate));
							if((songList[i].danceability*.50 <= song[0].danceability) & (songList[i].danceability*1.50 >= song[0].danceability))
								score += weight[13] * (1-(Math.abs(song[0].danceability-songList[i].danceability)/song[0].danceability));
							if((songList[i].bassiness*.50 <= song[0].bassiness) & (songList[i].bassiness*1.50 >= song[0].bassiness))
								score += weight[14] * (1-(Math.abs(song[0].bassiness-songList[i].bassiness)/song[0].bassiness));
							if((songList[i].dynamicComplexity*.50 <= song[0].dynamicComplexity) & (songList[i].dynamicComplexity*1.50 >= song[0].dynamicComplexity))
								score += weight[15] * (1-(Math.abs(song[0]-songList[i])/song[0]));
							if((songList[i].zeroCrossingRate*.50 <= song[0].zeroCrossingRate) & (songList[i].zeroCrossingRate*1.50 >= song[0].zeroCrossingRate))
								score += weight[16] * (1-(Math.abs(song[0].zeroCrossingRate-songList[i].zeroCrossingRate)/song[0].zeroCrossingRate));
							if(songList[i].intensity == song[0].intensity)
								score += weight[17];
							
							//If the song is "Like enough" or greater then the threshold add it to the playlist
							if(score >= threshold)
							{
								//console.log(songList[i].title);
								playlist.push(songList[i]);
							}
						}
						//Return the playlist to the client
						socket.emit('playlist', {'message' : playlist});
					}		
				});
			});	
		});
    });
});