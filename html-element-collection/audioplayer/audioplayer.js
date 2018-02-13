const audioplayer = document.getElementsByClassName('mediaplayer')[0];
const audio = audioplayer.getElementsByTagName('audio')[0];
const controls = audioplayer.getElementsByClassName('controls')[0];
const btnPlayPause = controls.getElementsByClassName('playstate')[0];
const btnStop = controls.getElementsByClassName('stop')[0];
const nextTrack = controls.getElementsByClassName('next')[0];
const previousTrack = controls.getElementsByClassName('back')[0];

const trackList = [
  {
    title: 'LA Chill Tour',
    src: 'mp3/LA Chill Tour.mp3'
  }, 
  {
    title: 'This is it band',
    src: 'mp3/This is it band.mp3'
  },
  {
    title: 'LA Fusion Jam',
    src: 'mp3/LA Fusion Jam.mp3'
  }
];

const trackTitle = audioplayer.getElementsByClassName('title')[0];
let currentTrack = 0;

function playCurrentTrack() {
  audio.src = trackList[currentTrack].src;
  trackTitle.title = trackList[currentTrack].title;
  }

function changeTrack() {
  audio.pause();
  playCurrentTrack()
  if(audioplayer.classList.contains('play')) {
    audio.play();
  }
}

btnPlayPause.onclick = () => {
  if (audioplayer.classList.contains('play')) {
    audio.pause();
  } else {
    audio.play();			
  }
  audioplayer.classList.toggle('play');
}

btnStop.onclick = () => {
  audio.pause();
  audio.currentTime = 0;
  audioplayer.classList.remove('play');
}

nextTrack.onclick = () => {       
  currentTrack++;
  if(currentTrack === trackList.length) {
    currentTrack = 0;
  }
  changeTrack();
}

previousTrack.onclick = () => {      
  currentTrack--;
  if(currentTrack < 0) {
    currentTrack = trackList.length - 1;
  }
  changeTrack();
}

audio.onended = () => {      
  audioplayer.classList.remove('play');
}
