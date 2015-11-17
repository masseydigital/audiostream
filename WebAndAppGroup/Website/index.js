//Load modules
var express = require('express');
var colors = require('colors');
var jquery = require('jquery');
var mysql = require('mysql');

var app = express();
var port = 8000;

var pool = mysql.createPool({
    host     : '71.220.53.35',
    user     : 'root',
    password : '1111',
    database : 'test',
    debug    :  false
});

function handle_database(req, res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          //connection.release();
          //res.json({"code" : 100, "status" : "Error in connection database"});
		  console.log("Error connecting to the database");
          return;
        }   

        console.log('connected as id ' + connection.threadId);
		
		connection.query("select * from test",function(err,rows){
            //connection.release();
            if(!err) {
                //res.json(rows);
				console.log(rows[0]);
            }           
        });
  });
}

console.log("Test text");
//Where html documents grab stuff for the site
app.use(express.static('public'));

//Defining url directories
//Default Directory
app.get('/', function(req, res) {
	handle_database(req, res);
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

