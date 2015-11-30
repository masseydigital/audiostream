var mysql = require('mysql');

var path;
var weight = [10, //0  Artist
          	  10, //1  Album
          	  5,  //2  Year
          	  20, //3  Genre
              5,  //4  Duration
              10, //5  BPM
          	  5,  //6  Loudness
          	  10, //7  Key
          	  5,  //8  Scale
          	  10, //9  Chords Key
              5,  //10 Chords Scale
          	  5,  //11 Chords Changes Rate
          	  5,  //12 Chords Number Rate
          	  5,  //13 Danceability
          	  5,  //14 Bassiness
          	  5,  //15 Dynamic Complexity
          	  5,  //16 Zero Cross Rate
          	  10] //17 Intensity
var threshold = 30;

//Query for database
//cursor.execute
var query = "SELECT artist,
               album,
               year,
               genre,
               duration,
               bpm,
               loudness,
               songKey,
               scale,
               chordsKey,
               chordsScale,
               chordsChangesRate,
               chordsNumberRate,
               danceability,
               bassiness,
               dynamicComplexity,
               zeroCrossingRate,
               intensity,
               title
               FROM SONGS,
               ARTISTS,
               ALBUMS,
               GENRES
               WHERE ALBUMS.albumID = SONGS.albumID
               AND GENRES.genreID = SONGS.genreID
               AND ALBUMS.artistID = ARTISTS.artistID";

//cursor.fetchall()
var result[2];
console.log(result[1]);

var similarSongs = [];
var i = 0;
var song = result[i];

for(i = 0; i < result; i++) {

}


