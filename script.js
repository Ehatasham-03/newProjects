console.log("Welcome to Spotify");

//initialize the variable
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let currentTimes = document.getElementsByClassName('currentTimes');
let durationTime = document.getElementsByClassName('durationTime');

let masterPlay = document.getElementById("masterPlay");
let masterSongName = document.getElementById("masterSongName");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Let Me Love You",
    filePath: "songs/1.mp3",
    coverPath: "cover/1.jpg",
  },
  {
    songName: "Shape of You",
    filePath: "songs/2.mp3",
    coverPath: "cover/2.jpg",
  },
  {
    songName: "Sia (Cheap Thrills)",
    filePath: "songs/3.mp3",
    coverPath: "cover/3.jpg",
  },
  {
    songName: "Voodoo Song",
    filePath: "songs/4.mp3",
    coverPath: "cover/4.jpg",
  },
  {
    songName: "Toh phir Aao",
    filePath: "songs/5.mp3",
    coverPath: "cover/5.jpg",
  },
  {
     songName: "Closer", 
  filePath: "songs/6.mp3", 
  coverPath: "cover/6.jpg"
 },
  {
    songName: "5 SOS Youngblood",
    filePath: "songs/7.mp3",
    coverPath: "cover/7.jpg",
  },
];
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// audioElement.play();

//handale play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
})
//listen to events
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});
myProgressBar.addEventListener("change", (a) => {
  
  audioElement.currentTime =
  (myProgressBar.value * audioElement.duration) / 100;

});


const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");

    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
      element.addEventListener("click", (e) => {
        if(audioElement.paused){
          makeAllPlays();
          songIndex = parseInt(e.target.id);
          e.target.classList.remove("fa-play-circle");
          e.target.classList.add("fa-pause-circle");
          audioElement.src = `songs/${songIndex + 1}.mp3`;
          audioElement.play();
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          gif.style.opacity = 1;
          masterPlay.classList.remove("fa-play-circle");
          masterPlay.classList.add("fa-pause-circle");
        }
        else{
          makeAllPlays();
          audioElement.src = `songs/${songIndex + 1}.mp3`;
          audioElement.pause();
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          gif.style.opacity = 0;
          masterPlay.classList.remove("fa-pause-circle");
          masterPlay.classList.add("fa-play-circle");
          e.target.classList.remove("fa-pause-circle");
          e.target.classList.add("fa-play-circle");
      }
    });
});

document.getElementById("next").addEventListener("click",nextsong = () => {
    if (songIndex >= 7) {
      songIndex = 0;
    } else {
      songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle")
  });

//auto change next song
audioElement.addEventListener("ended", nextsong);

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 7;
  } else {
    songIndex -= 1;
  }

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle")
});

 