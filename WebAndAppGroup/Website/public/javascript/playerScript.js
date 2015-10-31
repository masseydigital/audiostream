var audioElement = document.createElement('player');
      var playing = false;
      var looping = false;
      //Volume
      function isKeyPressed(event) {
      console.log("Key Pressed");
      if (event.keyCode == 45) {
        document.getElementById('player').volume-=0.1;
      } else if(event.keyCode == 43 || event.keyCode == 61) {
       document.getElementById('player').volume+=0.1;
      }
    }

  var activeSong;

function play(id){
    activeSong = document.getElementById(id);
    activeSong.play();
    var percentageOfVolume = activeSong.volume / 1;
    var percentageOfVolumeMeter = document.getElementById('volumeMeter').offsetHeight * percentageOfVolume;
    
    //Fills out the volume status bar.
    document.getElementById('volumeStatus').style.height = Math.round(percentageOfVolumeSlider) + "px";
}
//Pauses the active song.
function pause(){
    activeSong.pause();
}
//Does a switch of the play/pause with one button.
function playPause(id){
    //Sets the active song since one of the functions could be play.
    activeSong = document.getElementById(id);
    //Checks to see if the song is paused, if it is, play it from where it left off otherwise pause it.
    if (activeSong.paused){
         activeSong.play();
         document.getElementById("songPlayPause").innerHTML = "||";
         document.getElementById("songPlayPause").setAttribute("class", "playing");
    }else{
         activeSong.pause();
         document.getElementById("songPlayPause").innerHTML = "&#x25b6;";
         document.getElementById("songPlayPause").setAttribute("class", "");
    }
}

//Updates the current time function so it reflects where the user is in the song.
//This function is called whenever the time is updated.  This keeps the visual in sync with the actual time.
function updateTime(){
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

$(function(){
  
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