const playerChoicesEl = document.querySelector(".player__choices");
const computerChoicesEl = document.querySelector(".computer__choices");
const playerChoiceEl = document.querySelector(".player__choice");
const computerChoiceEl = document.querySelector(".computer__choice");
const playerScoreEl = document.querySelector(".player__score");
const computerScoreEl = document.querySelector(".computer__score");
const messageEl = document.querySelector(".message");

const btnReset = document.querySelector(".btn-reset");

const choices = [
  { name: "rock", defeats: ["scissor", "lizard"] },
  { name: "paper", defeats: ["rock", "spock"] },
  { name: "scissor", defeats: ["paper", "lizard"] },
  { name: "lizard", defeats: ["paper", "spock"] },
  { name: "spock", defeats: ["scissor", "rock"] },
];

const confettiObj = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
};

playerScoreEl.textContent = localStorage.getItem("playerScore") ?? 0;
computerScoreEl.textContent = localStorage.getItem("computerScore") ?? 0;

const renderChoice = (choicesEl, choiceEl, targetEl) => {
  choicesEl
    .querySelectorAll(".icon")
    .forEach((icon) => (icon.style.color = "inherit"));
  targetEl.style.color = "black";
  choiceEl.classList.remove("hidden");
  choiceEl.textContent = `--- ${targetEl.dataset.name}`;
};

const whoWon = ({ target }) => {
  const playerChoice = target.dataset.name;
  const computerChoice = choices[Math.round(Math.random() * 4)];
  computerChoicesEl.childNodes.forEach(
    (targetEl) =>
      targetEl.dataset.name === computerChoice.name &&
      renderChoice(computerChoicesEl, computerChoiceEl, targetEl)
  );

  if (computerChoice.name === playerChoice) {
    messageEl.textContent = "Draw";
  } else if (computerChoice.defeats.includes(playerChoice)) {
    messageEl.textContent = "You Lost";
    computerScoreEl.textContent = +computerScoreEl.textContent + 1;
    localStorage.setItem("computerScore", computerScoreEl.textContent);
  } else {
    messageEl.textContent = "You Won";
    playerScoreEl.textContent = +playerScoreEl.textContent + 1;
    localStorage.setItem("playerScore", playerScoreEl.textContent);
    confetti(confettiObj);
  }
};

const resetData = () => {
  localStorage.setItem("computerScore", 0);
  localStorage.setItem("playerScore", 0);
  computerScoreEl.textContent = 0;
  playerScoreEl.textContent = 0;
  [playerChoicesEl, computerChoicesEl].forEach((choice) =>
    choice
      .querySelectorAll(".icon")
      .forEach((el) => (el.style.color = "inherit"))
  );
  [playerChoiceEl, computerChoiceEl].forEach((choiceEl) =>
    choiceEl.classList.add("hidden")
  );
};

playerChoicesEl.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.classList.contains("icon")) return;

  renderChoice(playerChoicesEl, playerChoiceEl, e.target);
  whoWon(e);
});

btnReset.addEventListener("click", resetData);
