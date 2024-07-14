const gameOverEl = document.querySelector(".game-over");
const gameOverLabel = document.querySelector(".game-over__text");
const playAgainBtn = document.querySelector(".play-again");

const canvasEl = document.querySelector(".canvas");
const context = canvasEl.getContext("2d");

const canvasWidth = Math.min(500, window.innerWidth - 20);
const canvasHeight = Math.min(700, window.innerHeight - 20);
const brickMargin = 10;
const brickWidth = 65;
const brickHeight = 7;
const brickTopY = 0 + brickMargin;
const brickBottomY = canvasHeight - brickHeight - brickMargin;
let brickTopX = canvasWidth / 2 - brickWidth / 2;
let brickBottomX = canvasWidth / 2 - brickWidth / 2;

const ballRadius = 10;
let ballSpeedY = 5;
let ballSpeedX = 3;
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballYDirection = "down"; // down or up
let ballXDirection = "right"; // right or left

const winningScore = 7;
let playerScore = 0;
let computerScore = 0;
let ballHitted = false;
let playerMoved = false;

const renderBricks = () => {
  context.fillStyle = "#f1f3f5";
  context.fillRect(brickTopX, brickTopY, brickWidth, brickHeight);
  context.fillRect(brickBottomX, brickBottomY, brickWidth, brickHeight);
};

const renderDivider = () => {
  context.strokeStyle = "#dee2e6";
  context.setLineDash([5]);
  context.beginPath();
  context.moveTo(0, canvasHeight / 2);
  context.lineTo(canvasWidth, canvasHeight / 2);
  context.stroke();
};

const renderBall = () => {
  context.setLineDash([]);
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  context.fill();
};

const resetBallXY = () => {
  ballX = canvasWidth / 2;
  ballY = canvasHeight / 2;
  ballYDirection = "down";
  ballSpeedY = 5;
  playerMoved = false;
  ballHitted = false;
};

const checkGameWinner = () => {
  if (playerScore === winningScore || computerScore === winningScore) {
    canvasEl.hidden = true;

    if (playerScore === winningScore) gameOverLabel.textContent = "Player Won";
    else gameOverLabel.textContent = "Computer Won";

    gameOverEl.style.display = "flex";

    playerScore = computerScore = 0;
  }
};

const checkCollision = () => {
  if (ballY - ballRadius <= brickTopY + brickHeight) {
    if (
      ballX + ballRadius < brickTopX ||
      ballX - ballRadius > brickTopX + brickWidth
    ) {
      ++playerScore;
      resetBallXY();
      checkGameWinner();
    }
  }

  if (ballY + ballRadius >= brickBottomY) {
    // ball reached bottom brick
    if (
      ballX + ballRadius < brickBottomX ||
      ballX - ballRadius > brickBottomX + brickWidth
    ) {
      ++computerScore;
      resetBallXY();
      checkGameWinner();
    }
  }
};

const makeBallMove = () => {
  checkCollision();

  // Dumb ball movement
  if (ballY <= brickHeight + brickMargin + ballRadius) {
    ballYDirection = "down";
    if (playerMoved && ballHitted) ballSpeedY++;
    console.log(ballSpeedY);
  }
  if (ballY >= brickBottomY - ballRadius) {
    ballYDirection = "up";
    ballHitted = true;
    if (playerMoved && ballHitted) ballSpeedY++;
    console.log(ballSpeedY);
  }

  if (ballYDirection === "down") ballY += ballSpeedY;
  if (ballYDirection === "up") ballY -= ballSpeedY;

  if (ballX > canvasWidth - ballRadius) ballXDirection = "left";
  if (ballX < ballRadius) ballXDirection = "right";

  if (playerMoved && ballHitted) {
    if (ballXDirection === "right") ballX += ballSpeedX;
    if (ballXDirection === "left") ballX -= ballSpeedX;
  }
};

const makeComputerBrickMove = () => {
  brickTopX = ballX - brickWidth / 2;
};

setInterval(makeComputerBrickMove, 10);

const renderScore = (score, x, y) => context.fillText(score, x, y);

const renderScores = () => {
  const fontSize = 42; // in px
  context.textBaseline = "middle";
  context.font = `${fontSize}px sans-serif`;

  renderScore(computerScore, 20, canvasHeight / 2 - fontSize);
  renderScore(playerScore, 20, canvasHeight / 2 + fontSize);
};

const renderCanvas = () => {
  canvasEl.width = canvasWidth;
  canvasEl.height = canvasHeight;

  renderBricks();
  renderDivider();
  renderBall();
  renderScores();
  makeBallMove();

  window.requestAnimationFrame(renderCanvas);
};

renderCanvas();

canvasEl.addEventListener("mousemove", ({ offsetX }) => {
  brickBottomX = offsetX - brickWidth / 2;
  playerMoved = true;
});

playAgainBtn.addEventListener("click", () => {
  gameOverEl.style.display = "none";
  canvasEl.hidden = false;
});
