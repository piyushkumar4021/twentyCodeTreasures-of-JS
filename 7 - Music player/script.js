const songs = [
  { id: "1", title: "Awake in the Deep", artist: "Aldous Ichnite" },
  { id: "2", title: "Parallel", artist: "Beat Mekanik" },
  { id: "3", title: "City of Moonlight", artist: "Maxim Novak" },
  { id: "4", title: "When I was a Kid", artist: "Maxim Novak" },
  { id: "5", title: "Little Prince", artist: "Piotr Hummel" },
];

const audioEle = document.querySelector(".audio");
const title = document.querySelector(".song__title");
const artist = document.querySelector(".song__artist");
const thumbnail = document.querySelector(".img");
const progressContainer = document.querySelector(".song__progress-container");
const progress = document.querySelector(".song__progress");
const start = document.querySelector(".song__start");
const end = document.querySelector(".song__end");

const btnPlay = document.querySelector(".fa-play");
const btnPause = document.querySelector(".fa-pause");
const btnNext = document.querySelector(".fa-forward");
const btnPrev = document.querySelector(".fa-backward");

let songIndex = 0,
  isPlaying = 0;

function togglePlayPause() {
  btnPause.classList.toggle("hidden");
  btnPlay.classList.toggle("hidden");
}

function play() {
  togglePlayPause();
  isPlaying = 1;
  audioEle.play();
}

function pause() {
  togglePlayPause();
  isPlaying = 0;
  audioEle.pause();
}

function renderSong() {
  title.textContent = songs[songIndex].title;
  artist.textContent = songs[songIndex].artist;
  audioEle.src = `src/songs/${songs[songIndex].id}.mp3`;
  thumbnail.src = `src/thumbnails/${songs[songIndex].id}.jpg`;
}

function changeSong() {
  // -1 -> prev
  //  1 -> next
  progress.style.width = "0%";
  songIndex = (songIndex + songs.length + this) % songs.length;
  renderSong();
  if (isPlaying) audioEle.play();
}

function updateStartTime() {
  let min = Math.trunc(audioEle.currentTime / 60);
  let sec = String(Math.trunc(audioEle.currentTime % 60)).padStart(2, "0");
  start.textContent = `${min}:${sec}`;
}

function updateEndTime() {
  let min = Math.trunc(audioEle.duration / 60);
  let sec = String(Math.trunc(audioEle.duration % 60)).padStart(2, "0");
  end.textContent = `${min}:${sec}`;
}

function updateProgressBar() {
  let timeStamp = (audioEle.currentTime / audioEle.duration) * 100;
  progress.style.width = `${timeStamp}%`;

  updateStartTime();
}

function updatePlayTime(e) {
  const { clientWidth: width } = this;
  const { offsetX: clickX } = e;
  const sec = (clickX / width) * audioEle.duration;
  progress.style.width = `${(clickX / width) * 100}%`;
  audioEle.currentTime = sec;
}

renderSong(songIndex);

audioEle.addEventListener("loadedmetadata", updateEndTime);
audioEle.addEventListener("timeupdate", updateProgressBar);
audioEle.addEventListener("ended", changeSong.call(1));

progressContainer.addEventListener("click", updatePlayTime);

document.querySelector(".song__controls").addEventListener("click", (e) => {
  const ele = e.target;
  //   Guarding
  if (!ele.classList.contains("icon")) return;

  if (ele.classList.contains("fa-play")) play();
  if (ele.classList.contains("fa-pause")) pause();
  if (ele.classList.contains("fa-forward")) changeSong.call(1);
  if (ele.classList.contains("fa-backward")) changeSong.call(-1);
});

document.addEventListener("keydown", (e) => {
  if (e.code !== "Space") return;
  isPlaying ? pause() : play();
});
