//playerScript.js
//Responsible for all js audio player communication on the index page
var audioElement = document.createElement('player');
var song = document.getElementById('song'); //Audio tag
//var songSource = document.getElementById('songSource'); //Source tag inside the audio tag

var playing = false;
var looping = false;
var activeSong;

var init = false; //Determines if the play button has been pressed at least once

//Used to hold active song info, is updated from eventual database
//songObject = {id,source,title,artist,length};

var SongObject = function(songID, songDir, songTitle, songArtist) {
  this.songID = songID;
  this.songDir = songDir;
  this.songTitle = songTitle;
  this.songArtist = songArtist;
}

var song_1 = new SongObject(0, "somethings-gotta-give_all-time-low_future-hearts.mp3", "Something's Gotta Give", "All Time Low");
var song_2 = new SongObject(1, "break-your-little-heart_all-time-low_nothing-personal.mp3", "Break Your Little Heart", "All Time Low");
var song_3 = new SongObject(3, "the-anthem_good-charlotte_the-young-and-the-hopeless.mp3", "The Anthem", "Good Charlotte");
//var song_3 = new SongObject(4);

//Debug song destination array
var songSrc = [song_1, song_2, song_3];
var currentSongSrc = 0;

currentSongDir = "testAudio/" + songSrc[currentSongSrc].songDir;

function nextSong() {
  if(init) {
  if(currentSongSrc + 1 < songSrc.length) {
    currentSongSrc++;
    currentSongDir = "testAudio/" + songSrc[currentSongSrc].songDir;
    activeSong.src = currentSongDir;
    activeSong.load();
    appendMetaTag();
    activeSong.play('song');
    if(song.paused) {
      document.getElementById('playPauseButton').className = 'fa fa-play';
      activeSong.pause();
    } else {
      
    }
  } else {
    alert("No More Songs!");
    document.getElementById('song').currentTime = '0';
    document.getElementById('playPauseButton').className = 'fa fa-play';
    currentSongSrc = 0;
    currentSongDir = "testAudio/" + songSrc[currentSongSrc].songDir;
    activeSong.src = currentSongDir;
    activeSong.load();
    appendMetaTag();
    activeSong.pause();
  }
}
}

function restartSong() {
  document.getElementById('song').currentTime='0';
}

function appendMetaTag() {
  document.getElementById('metaTagDiv').innerHTML = "Currently Playing: " + songSrc[currentSongSrc].songTitle + " - " + songSrc[currentSongSrc].songArtist;
}

//Volume
function isKeyPressed(event) {
  if (event.keyCode == 45) {
    document.getElementById('player').volume-=0.1;
  } else if(event.keyCode == 43 || event.keyCode == 61) {
    document.getElementById('player').volume+=0.1;
  }
}

function play(id){
    activeSong = document.getElementById(id);
    activeSong.play();
    var percentageOfVolume = activeSong.volume / 1;
    var percentageOfVolumeMeter = document.getElementById('volumeMeter').offsetHeight * percentageOfVolume;    
    //Fills out the volume status bar.
    document.getElementById('volumeStatus').style.height = Math.round(percentageOfVolumeSlider) + "px";
    document.getElementById('playPauseButton').className = 'fa fa-pause';
}

//Pauses the active song.
function pause() {
    activeSong.pause();
    
}

//Does a switch of the play/pause with one button.
function playPause(id) {
    //Sets the active song since one of the functions could be play.
    activeSong = document.getElementById(id);
    if(!init) {
      activeSong.src = currentSongDir;
      activeSong.load();
      appendMetaTag();
      init = true;
    }

     document.getElementById('playPauseButton').className = 'fa fa-pause';
    //Checks to see if the song is paused, if it is, play it from where it left off otherwise pause it.
    if (activeSong.paused) {
         document.getElementById('playPauseButton').className = 'fa fa-pause';
         activeSong.play();
         document.getElementById("songPlayPause").innerHTML = "||";
    } else {
         document.getElementById('playPauseButton').className = 'fa fa-play';
         activeSong.pause();
         document.getElementById("songPlayPause").innerHTML = "&#x25b6;";
         document.getElementById("songPlayPause").setAttribute("class", "");
        }
}

//Updates the current time function so it reflects where the user is in the song.
//This function is called whenever the time is updated.  This keeps the visual in sync with the actual time.
function updateTime() {  

    var currentSeconds = (Math.floor(activeSong.currentTime % 60) < 10 ? '0' : '') + Math.floor(activeSong.currentTime % 60);
    var currentMinutes = Math.floor(activeSong.currentTime / 60);
    //Sets the current song location compared to the song duration.
    document.getElementById("songTimeA").innerHTML = currentMinutes + ":" + currentSeconds;
    document.getElementById("songTimeB").innerHTML = Math.floor(activeSong.duration / 60) + ":" + (Math.floor(activeSong.duration % 60) < 10 ? '0' : '') + Math.floor(activeSong.duration % 60);
    document.getElementById("songTimeC").innerHTML = currentMinutes + ":" + currentSeconds;
    document.getElementById("songTimeD").innerHTML = Math.floor(activeSong.duration / 60) + ":" + (Math.floor(activeSong.duration % 60) < 10 ? '0' : '') + Math.floor(activeSong.duration % 60);

    //Fills out the slider with the appropriate position.
    var percentageOfSong = (activeSong.currentTime/activeSong.duration);
    var percentageOfSlider = document.getElementById('songSlider').offsetWidth * percentageOfSong;
    
    //Updates the track progress div.
    document.getElementById('trackProgress').style.width = Math.round(percentageOfSlider) + "px";
    
    if(document.getElementById("songTimeA").innerHTML == document.getElementById("songTimeB").innerHTML){
      document.getElementById("songPlayPause").innerHTML = "&#x25b6;";
      document.getElementById("songPlayPause").setAttribute("class", "");
    };  
}

function updatePlaylist() {
    $("#song").bind('ended', function(){
    nextSong();
    play(song);
    activeSong.currentTime = 0;
    appendMetaTag();
});
}


function volumeUpdate(number){
    //Updates the volume of the track to a certain number.
    activeSong.volume = number / 100;
}
//Changes the volume up or down a specific number
function changeVolume(number, direction){
    //Checks to see if the volume is at zero, if so it doesn't go any further.
    if(activeSong.volume >= 0 && direction == "down"){
        activeSong.volume = activeSong.volume - (number / 100);
    }
    //Checks to see if the volume is at one, if so it doesn't go any higher.
    if(activeSong.volume <= 1 && direction == "up"){
        activeSong.volume = activeSong.volume + (number / 100);
    }
    
     if(activeSong.volume > .6){
      document.getElementById('volume').innerHTML = '<div id="volume-icon"></div><span>)</span><span>)</span><span>)</span>';
      document.getElementById("volume").setAttribute("class", "");
    }else if(activeSong.volume > 0 && activeSong.volume <= .3){
      document.getElementById('volume').innerHTML = '<div id="volume-icon"></div><span>)</span>';
      document.getElementById("volume").setAttribute("class", "");
    }else if(activeSong.volume == 0){
      document.getElementById("volume").setAttribute("class", "muted");
    }else{
      document.getElementById('volume').innerHTML = '<div id="volume-icon"></div><span>)</span><span>)</span>';
      document.getElementById("volume").setAttribute("class", "");
    }
    
    //Finds the percentage of the volume and sets the volume meter accordingly.
    var percentageOfVolume = activeSong.volume / 1;
    var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetHeight * percentageOfVolume;
    
    document.getElementById('volumeStatus').style.height = Math.round(percentageOfVolumeSlider) + "px";
}
//Sets the location of the song based off of the percentage of the slider clicked.
function setLocation(percentage){
    activeSong.currentTime = activeSong.duration * percentage;
}
/*
Gets the percentage of the click on the slider to set the song position accordingly.
Source for Object event and offset: http://website-engineering.blogspot.com/2011/04/get-x-y-coordinates-relative-to-div-on.html
*/
function setSongPosition(obj,e){
    //Gets the offset from the left so it gets the exact location.
    var songSliderWidth = obj.offsetWidth;
    var evtobj=window.event? event : e;
    clickLocation =  evtobj.layerX;
    
    var percentage = (clickLocation/songSliderWidth);
    //Sets the song location with the percentage.
    setLocation(percentage);
}

//Set's volume as a percentage of total volume based off of user click.
function setVolume(percentage){
    activeSong.volume =  percentage;
    
    if(percentage > .6){
      document.getElementById('volume').innerHTML = '<div id="volume-icon"></div><span>)</span><span>)</span><span>)</span>';
      document.getElementById("volume").setAttribute("class", "");
    }else if(percentage > 0 && percentage <= .3){
      document.getElementById('volume').innerHTML = '<div id="volume-icon"></div><span>)</span>';
      document.getElementById("volume").setAttribute("class", "");
    }else if(percentage == 0){
      document.getElementById("volume").setAttribute("class", "muted");
    }else{
      document.getElementById('volume').innerHTML = '<div id="volume-icon"></div><span>)</span><span>)</span>';
      document.getElementById("volume").setAttribute("class", "");
    }
    
    var percentageOfVolume = activeSong.volume / 1;
    var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetHeight * percentageOfVolume;
    
    document.getElementById('volumeStatus').style.height = Math.round(percentageOfVolumeSlider) + "px";
}

//Set's new volume id based off of the click on the volume bar.
function setNewVolume(obj,e){
    var volumeSliderHeight = obj.offsetHeight;
    var evtobj = window.event? event: e;
    clickLocation = obj.offsetHeight - evtobj.layerY;
    
    var percentage = (clickLocation/volumeSliderHeight);
    setVolume(percentage);
}
//Stop song by setting the current time to 0 and pausing the song.
function stopSong(){
    activeSong.currentTime = 0;
    activeSong.pause();
    document.getElementById("songPlayPause").innerHTML = "&#x25b6;";
    document.getElementById("songPlayPause").setAttribute("class", "");
}

//Change Song
function changeSong(id){
    stopSong();
    
    //Sets the active song since one of the functions could be play.
    activeSong = document.getElementById(id);
    
    activeSong.play();
}

//mute
function muteAudio(){
  var ismuted = document.getElementById("volume").getAttribute("class") == "muted" ? true : false;
  var curVol = document.getElementById("volume").getAttribute("muteVol");
  
  if(ismuted == true){
    setVolume(curVol);
    document.getElementById("volume").setAttribute("class", "");
  }else{
    var prevVol = document.getElementById('volumeStatus').offsetHeight / document.getElementById('volumeMeter').offsetHeight;
    setVolume(0);
    document.getElementById("volume").setAttribute("class", "muted");
    document.getElementById("volume").setAttribute("muteVol", prevVol);
  }
}

(function(){
  
  //Draggable player
  $('#audioplayer').draggable();
  
  //Changing Song
  $('#tracklist li').click(function(){
    $('#tracklist li#playing em').remove();
    $('#tracklist li#playing').attr("id", "");
    
    var audioLink = $(this).attr("audioLink");
    
    $(this).attr("id", "playing").append(" <em>(Playing)</em>");
    $("audio").remove();
    $("#tracklist").after('<audio id="song" ontimeupdate="updateTime()"><source src="'+audioLink+'" type="audio/mp3"/>Your browser does not support the audio tag.</audio>');
  });
  
});