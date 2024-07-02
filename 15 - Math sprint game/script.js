const startPage = document.querySelector(".start");
const countdownPage = document.querySelector(".countdown");
const playPage = document.querySelector(".play");
const resultPage = document.querySelector(".result");

const selections = document.querySelector(".selections");
const allSelection = document.querySelectorAll(".selection");
const allScore = document.querySelectorAll(".score");

const questionsEl = document.querySelector(".questions");

const totalTimeEl = document.querySelector(".total-time");
const baseTimeEl = document.querySelector(".base-time");
const penaltyTimeEl = document.querySelector(".penalty-time");

const startBtn = document.querySelector(".btn-start");
const btns = document.querySelector(".btns");
const playAgainBtn = document.querySelector(".btn-play-again");

const highScore = JSON.parse(localStorage.getItem("score")) ?? [
  0.0, 0.0, 0.0, 0.0,
];

const updateScore = () => {
  highScore.forEach((score, i) => (allScore[i].textContent = `${score}s`));
};

updateScore();

let noOfQuestions = 10;
let questions = [];
let playerGuess = [];

let baseTime = 0;
let penaltyTime = 0;
let totalTime = 0;

const random = (num) => Math.round(Math.random() * num);

function shuffle(array) {
  let m = array.length,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    [array[m], array[i]] = [array[i], array[m]];
  }

  return array;
}

const calcResult = () => {
  penaltyTime = 0;

  questions.forEach((question, i) => {
    if (question.evaluated !== playerGuess[i]) penaltyTime += 0.5;
  });

  totalTime = baseTime + penaltyTime;

  if (noOfQuestions === 10) highScore[0] = totalTime.toFixed(1);
  if (noOfQuestions === 25) highScore[1] = totalTime.toFixed(1);
  if (noOfQuestions === 50) highScore[2] = totalTime.toFixed(1);
  if (noOfQuestions === 99) highScore[3] = totalTime.toFixed(1);

  updateScore();

  localStorage.setItem("score", JSON.stringify(highScore));

  totalTimeEl.textContent = `${totalTime.toFixed(1)}s`;
  baseTimeEl.textContent = `Base Time: ${baseTime.toFixed(1)}s`;
  penaltyTimeEl.textContent = `Penalty: +${penaltyTime.toFixed(1)}s`;
};

const startTimer = () => {
  baseTime = 0;

  const startTimerInterval = setInterval(() => {
    if (playerGuess.length === noOfQuestions) clearInterval(startTimerInterval);
    baseTime += 0.1;
  }, 100);
};

const startCountdown = () => {
  let countdownValue = 3;

  countdownPage.textContent = countdownValue;

  const countdownInterval = setInterval(() => {
    if (!countdownValue) {
      clearInterval(countdownInterval);
      countdownPage.hidden = true;
      playPage.hidden = false;
      questionsEl.scroll(0, 0);
      startTimer();
      return;
    }
    --countdownValue;
    countdownPage.textContent = countdownValue ? countdownValue : "GO!";
  }, 1000);
};

const createQuestions = () => {
  let rightQuestions = random(noOfQuestions);
  let wrongQuestions = noOfQuestions - rightQuestions;

  questions = [];
  while (rightQuestions) {
    const num1 = random(12);
    const num2 = random(12);

    questions.push({
      evaluated: "true",
      value: `${num1} * ${num2} = ${num1 * num2}`,
    });

    --rightQuestions;
  }

  while (wrongQuestions) {
    const num1 = random(12);
    const num2 = random(12);

    questions.push({
      evaluated: "false",
      value: `${num1 - random(num1)} * ${num2 - random(num2)} = ${
        num1 * num2 - random(num1 * num2) - 1
      }`,
    });

    --wrongQuestions;
  }

  shuffle(questions);
};

const renderQuestions = () => {
  let questionsHtml = questions.map(
    (question) => `<div class="question">${question.value}</div>`
  );
  questionsHtml = questionsHtml.join("");

  questionsEl.innerHTML = "";
  questionsEl.insertAdjacentHTML("afterbegin", questionsHtml);
};

const scrollToNext = () => {
  const height = document.querySelector(".question").clientHeight;
  questionsEl.scrollBy({ top: height, behavior: "smooth" });
};

selections.addEventListener("click", (e) => {
  const selection = e.target.closest(".selection");

  if (!selection) return;

  // Visual
  allSelection.forEach((selection) =>
    selection.classList.remove("selection-selected")
  );
  selection.classList.add("selection-selected");

  // Get Selection Value
  noOfQuestions = +selection.dataset.value;
});

startBtn.addEventListener("click", () => {
  if (!noOfQuestions) return;

  startCountdown();

  createQuestions();
  renderQuestions();

  startPage.hidden = true;
  countdownPage.hidden = false;

  playerGuess = [];
});

btns.addEventListener("click", (e) => {
  e.preventDefault();
  const { target: clicked } = e;
  if (!clicked.classList.contains("btn")) return;

  scrollToNext();
  playerGuess.push(clicked.dataset.value);

  console.log("clicked");

  if (playerGuess.length === noOfQuestions) {
    calcResult();
    playPage.hidden = true;
    resultPage.hidden = false;
  }
});

playAgainBtn.addEventListener("click", () => {
  resultPage.hidden = true;
  startPage.hidden = false;
});
