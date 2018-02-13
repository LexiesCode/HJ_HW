'use strict';
const btns = document.getElementsByClassName('drum-kit__drum');
 
/*  for (let btn of btns) {
    btn.onclick = () => {  
      let sounds = btn.getElementsByTagName('audio');
      for (let sound of sounds) {
         sound.play();
	     sound.currentTime = 0;
      }
    }
  }
*/

  for (let btn of btns) {
    btn.onclick = () => {  
      let sound = btn.getElementsByTagName('audio')[0];
      sound.play();
      sound.currentTime = 0;
    }
  }