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