const getJokeBtn = document.querySelector(".btn");

const getJoke = () => {
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const joke = data.joke ? data.joke : `${data.setup} ... ${data.delivery}`;
      console.log(joke);
      tellmeJoke(joke);
    })
    .catch((error) => console.log(error));
};

const tellmeJoke = async (joke) => {
  const voices = speechSynthesis.getVoices();
  const utterance = new SpeechSynthesisUtterance(joke);

  utterance.voice = voices[5];
  utterance.lang = "en-US";
  utterance.volume = 1.5;

  getJokeBtn.disabled = true;

  speechSynthesis.speak(utterance);

  utterance.onend = () => (getJokeBtn.disabled = false);
};

getJokeBtn.addEventListener("click", getJoke);
