const form = document.querySelector(".form");
const inputTitle = document.querySelector("#countdown-title");
const inputDate = document.querySelector("#countdown-date");

const btnCreateCountdown = document.querySelector(".btn-countdown-create");
const btnResetCountdown = document.querySelector(".btn-countdown-reset");
const btnCompleteCountdown = document.querySelector(".btn-countdown-complete");

const counterDate = document.querySelector(".days");
const counterHours = document.querySelector(".hours");
const counterMins = document.querySelector(".mins");
const counterSecs = document.querySelector(".secs");

const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

const todayDate = new Date().toISOString().slice(0, 10);
inputDate.setAttribute("min", todayDate);

let countdownActive;

const createCountdown = (coundownDate) => {
  coundownDate = new Date(coundownDate).getTime();

  function updateCountdown() {
    const diff = coundownDate - Date.now() - 19800000;

    counterDate.textContent = Math.floor(diff / day);
    counterHours.textContent = Math.floor((diff / hour) % 24);
    counterMins.textContent = Math.floor((diff / min) % 60);
    counterSecs.textContent = Math.floor((diff / sec) % 60);

    if (diff < 0) {
      clearInterval(countdownActive);

      document.querySelector(".countdown").classList.add("hidden");
      document.querySelector(".countdown-complete").classList.remove("hidden");
    }
  }

  countdownActive = setInterval(updateCountdown, 1000);

  document.querySelector(".countdown-create").classList.add("hidden");
  document.querySelector(".countdown").classList.remove("hidden");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  createCountdown(inputDate.value);

  inputDate.value = "";
  inputTitle.value = "";
});

btnResetCountdown.addEventListener("click", (e) => {
  e.preventDefault();

  clearInterval(countdownActive);

  document.querySelector(".countdown-create").classList.remove("hidden");
  document.querySelector(".countdown").classList.add("hidden");
});

btnCompleteCountdown.addEventListener("click", () => {
  document.querySelector(".countdown-complete").classList.add("hidden");
  document.querySelector(".countdown-create").classList.remove("hidden");
});
