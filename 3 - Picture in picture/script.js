const videoEle = document.querySelector(".video");
const startBtn = document.querySelector(".btn");

async function getMediaStream() {
  const mediaStream = await navigator.mediaDevices.getDisplayMedia();
  videoEle.srcObject = mediaStream;

  //   videoEle.src = URL.createObjectURL(mediaStream);

  videoEle.onloadedmetadata = () => {
    videoEle.play();
    console.log("metadata loaded");
  };
}

startBtn.addEventListener(
  "click",
  async () => await videoEle.requestPictureInPicture()
);

getMediaStream();
