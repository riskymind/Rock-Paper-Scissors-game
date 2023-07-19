let playerScore = 0;
let computerScore = 0;
let roundwinner = "";

// UI
const scoreMessage = document.getElementById("scoreMessage");
const rockButton = document.getElementById("rock-btn");
const paperButton = document.getElementById("paper-btn");
const scissorsButton = document.getElementById("scissors-btn");
const playerSign = document.getElementById("player-sign");
const computerSign = document.getElementById("comp-sign");
const scoreInfo = document.getElementById("score-info");
const playerScoreInfo = document.getElementById("player-score");
const compScoreInfo = document.getElementById("comp-score");
const finalResult = document.getElementById("endGameMsg");
const modal = document.getElementById("endGameModal");
const overlay = document.querySelector(".overlay");
const restartBtn = document.querySelector(".btn-restart");

// check for winner
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundwinner = "tie";
  } else if (
    (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
    (playerSelection === "PAPER" && computerSelection === "ROCK")
  ) {
    playerScore++;
    roundwinner = "player";
  } else {
    computerScore++;
    roundwinner = "computer";
  }
  updateScoreMessage(roundwinner, playerSelection, computerSelection);
}

// Display the winner
function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    scoreMessage.textContent = `${playerSelection} beats ${computerSelection}`;
    return;
  } else if (winner === "computer") {
    scoreMessage.textContent = `${playerSelection} is beaten by ${computerSelection}`;
  } else {
    scoreMessage.textContent = `${playerSelection} ties with ${computerSelection}`;
  }
}

// play game event
rockButton.addEventListener("click", () => playGame("ROCK"));
paperButton.addEventListener("click", () => playGame("PAPER"));
scissorsButton.addEventListener("click", () => playGame("SCISSORS"));
overlay.addEventListener("click", closeModal);
restartBtn.addEventListener("click", restartGame);

function playGame(params) {
  // check if the game is over
  if (isGameOver()) {
    openModal();
    return;
  }
  // if yes open modal and return

  // Get computer choice
  const compChoice = getRandomChoice();
  // play round
  playRound(params, compChoice);

  // update choice
  updateChoice(params, compChoice);

  // update score
  updateScore();

  if (isGameOver()) {
    openModal();
    setFinalResult();
  }
}

function getRandomChoice() {
  let random = Math.floor(Math.random() * 3);
  switch (random) {
    case 0:
      return "ROCK";
    case 1:
      return "PAPER";
    case 2:
      return "SCISSORS";
  }
}

function updateChoice(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "ROCK":
      playerSign.textContent = "✊";
      break;
    case "PAPER":
      playerSign.textContent = "✋";
      break;
    case "SCISSORS":
      playerSign.textContent = "✌";
      break;
  }

  switch (computerSelection) {
    case "ROCK":
      computerSign.textContent = "✊";
      break;
    case "PAPER":
      computerSign.textContent = "✋";
      break;
    case "SCISSORS":
      computerSign.textContent = "✌";
      break;
  }
}

function updateScore() {
  if (roundwinner === "tie") {
    scoreInfo.textContent = "It's A TIE";
  } else if (roundwinner === "player") {
    scoreInfo.textContent = "You Won!";
  } else {
    scoreInfo.textContent = "You Lost!";
  }

  playerScoreInfo.textContent = `Player: ${playerScore}`;
  compScoreInfo.textContent = `Computer: ${computerScore}`;
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

function setFinalResult() {
  return playerScore > computerScore
    ? (finalResult.textContent = "You won")
    : (finalResult.textContent = "You Lost!");
}

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  scoreInfo.textContent = "Choose your Weapon";
  scoreMessage.textContent = "First to score 5 points wins the game";
  playerScoreInfo.textContent = "Player: 0";
  compScoreInfo.textContent = "Computer: 0";
  playerSign.textContent = " ? ";
  computerSign.textContent = " ? ";
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
