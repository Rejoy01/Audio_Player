const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progresContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
//Music
const songs = [
    {
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'Jacinto Design',
    },
    {
      name: 'metric-1',
      displayName: 'Front Row (Remix)',
      artist: 'Metric/Jacinto Design',
    },
  ];
  


// check if playing
let isPlaying = false;


//play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener 
playBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
  
// Current song
let songIndex = 0;

//prev song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}


// On load - selector
loadSong(songs[songIndex]);
//updateProgressBar andd tiime
function updateProgressBar(e){
    if(isPlaying){
       const {duration , currentTime} = e.srcElement;
       console.log(duration,currentTime);
       // Update progress bar width
       const progressPercent = (currentTime / duration) * 100;
       progress.style.width = `${progressPercent}%`;
       // calculate display for duration
       const durationMinutes = Math.floor(duration/60);
       console.log('minutes',durationMinutes);
       let durationSeconds = Math.floor(duration%60);
       if (durationSeconds <10){
        durationSeconds = `0${durationSeconds}`;
       }
       console.log('seconds',durationSeconds);
       // Delay switching duration Element to avoid NAn
       if (durationSeconds){
          durationEl.textContent=`${durationMinutes}:${durationSeconds}`
       }
        // calculate display for current
        const currentMinutes = Math.floor(currentTime/60);
        console.log('minutes',currentMinutes);
        let currentSeconds = Math.floor(currentTime%60);
        if (currentSeconds <10){
         currentSeconds = `0${currentSeconds}`;
        }
        console.log('seconds',durationSeconds);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

    }
}
// set progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    console.log('width',width);
    const clickX = e.offsetX;
    console.log('clickX',clickX);
    const{duration} = music
    console.log(clickX/width);
    console.log((clickX/width)*duration);
    music.currentTime = (clickX/width)*duration;

}


// event listener
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progresContainer.addEventListener('click',setProgressBar);