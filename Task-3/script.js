// save songs to array
const songList = [
  {
      title: "Acoustic Breeze",
      file: "1.mp3",

  },
  {
      title: "A New Beginning",
      file: "2.mp3",
  },
  {
      title: "Creative Minds",
      file: "3.mp3",
  },
  {
      title: "Hello",
      file: "4.mp3",
  },
];

let actualSong = null;
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
progressContainer.addEventListener("click", setProgress);


//control clickable
audio.addEventListener("timeupdate", updateProgress);
play.addEventListener("click", () => {
  if (audio.paused) {
      playSong();
  }
   else {
      pauseSong();
  }
});

next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());

// Load songs and show the list
function loadSongs() {
  songList.forEach((song, index) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = song.title;
      link.href = "#";
      link.addEventListener("click", () => loadSong(index));
      li.appendChild(link);
      songs.appendChild(li);
  })
}

// load selected song
function loadSong(songIndex) {
  if (songIndex !== actualSong) {
      changeActiveClass(actualSong, songIndex);
      actualSong = songIndex;
      audio.src = "songs/" + songList[songIndex].file;
      playSong();
      changeSongtitle(songIndex);
  }
}

// Update song progress bar
function updateProgress(event) {
  const {duration, currentTime} = event.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";
}

// Make the progress bar clickable
function setProgress(event) {
  const totalWidth = this.offsetWidth;
  const progressWidth = event.offsetX;
  const current = (progressWidth / totalWidth) * audio.duration;
  audio.currentTime = current;
}

// update controls
function updateControls() {
  if (audio.paused) {
      play.classList.remove("fa-pause");
      play.classList.add("fa-play");1
  } else {
      play.classList.add("fa-pause");
      play.classList.remove("fa-play");
  }
}

// play song
function playSong() {
  if (actualSong !== null) {
      audio.play();
      updateControls();
  }
}

// pause song
function pauseSong() {
  audio.pause();
  updateControls();
}

// change active class
function changeActiveClass(lastIndex, newIndex)
 {
  const links = document.querySelectorAll("a");
  if (lastIndex !== null) 
  {
      links[lastIndex].classList.remove("active");
  }
  links[newIndex].classList.add("active");
}


// Change song title
function changeSongtitle(songIndex) {
   title.innerText = songList[songIndex].title;
}

// previous song
function prevSong() {
  if (actualSong > 0)
   {
      loadSong(actualSong - 1);
  }
}

// next song
function nextSong() {
  if (actualSong < songList.length -1) 
  {
      loadSong(actualSong + 1);
  }
}

loadSongs();
