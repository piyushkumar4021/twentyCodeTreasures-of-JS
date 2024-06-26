const btnPlay = document.querySelector(".bi-play-fill");
const btnPause = document.querySelector(".bi-pause-fill");
const btnUnmute = document.querySelector(".bi-volume-mute-fill");
const btnMute = document.querySelector(".bi-volume-up-fill");
const btnFullscreen = document.querySelector(".bi-arrows-fullscreen");
const btnExitFullscreen = document.querySelector(".bi-fullscreen-exit");

const speed = document.querySelector(".speed");

const progressRange = document.querySelector(".progress__range");
const progressBar = document.querySelector(".progress__bar");

const volumeRange = document.querySelector(".volume__range");
const volumeBar = document.querySelector(".volume__bar");

const videoCurrentTime = document.querySelector(".current");
const videoDuration = document.querySelector(".duration");

const videoPlayer = document.querySelector(".player");
const videoEl = document.querySelector(".video");

const togglePlayPause = () => {
  btnPlay.classList.toggle("hidden");
  btnPause.classList.toggle("hidden");
};

const muteIcon = () => {
  btnMute.classList.add("hidden");
  btnUnmute.classList.remove("hidden");
};

const unmuteIcon = () => {
  btnMute.classList.remove("hidden");
  btnUnmute.classList.add("hidden");
};

const toggleFullscreenIcon = () => {
  btnExitFullscreen.classList.toggle("hidden");
  btnFullscreen.classList.toggle("hidden");
};

btnPause.addEventListener("click", () => {
  videoEl.pause();
  togglePlayPause();
});

btnPlay.addEventListener("click", () => {
  videoEl.play();
  togglePlayPause();
});

videoEl.addEventListener("click", () => {
  videoEl.paused ? videoEl.play() : videoEl.pause();
});

progressRange.addEventListener("click", (e) => {
  const to = e.offsetX / progressRange.clientWidth;
  progressBar.style.width = `${to * 100}%`;
  videoEl.currentTime = to * videoEl.duration;
});

// Volume
videoEl.volume = 1;

const changeVolume = (e) => {
  const to = (e.offsetX / volumeRange.clientWidth).toFixed(1);
  volumeBar.style.width = `${to * 100}%`;
  videoEl.volume = to;

  // videoEl.paused ? videoEl.play() : videoEl.pause();

  unmuteIcon();
  !+to && muteIcon();
};

btnMute.addEventListener("click", () => changeVolume({ offsetX: 0 }));

btnUnmute.addEventListener("click", () =>
  changeVolume({ offsetX: volumeRange.clientWidth / 2 })
);

volumeRange.addEventListener("click", changeVolume);

// Update progress
const updateTimeText = (time, timeEle) => {
  const min = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);
  const sec = Math.floor(time % 60)
    .toString()
    .padStart(2, 0);

  timeEle.textContent = `${min}:${sec}`;
};

videoEl.addEventListener("loadedmetadata", () =>
  updateTimeText(videoEl.duration, videoDuration)
);

const updateProgress = () => {
  const to = videoEl.currentTime / videoEl.duration;
  progressBar.style.width = `${to * 100}%`;

  updateTimeText(videoEl.currentTime, videoCurrentTime);
};

videoEl.addEventListener("timeupdate", updateProgress);

// Playback Speed
const changeSpeed = () => (videoEl.playbackRate = speed.value);
speed.addEventListener("change", changeSpeed);

// Fullscreen
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  videoEl.classList.add("center");
}
/* Close fullscreen */
function closeFullscreen(elem) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  videoEl.classList.remove("center");
}

btnFullscreen.addEventListener("click", () => {
  toggleFullscreenIcon();
  openFullscreen(videoPlayer);
});

btnExitFullscreen.addEventListener("click", () => {
  toggleFullscreenIcon();
  closeFullscreen(videoPlayer);
});
