const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winning-message");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoard();
  winningMessage.classList.remove("show");
  winningMessage.classList.remove("x");
  winningMessage.classList.remove("circle");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  //place mark
  placeMark(cell, currentClass);
  //check for win
  //check for draw
  //switch turns
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoard();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML = "Draw!";
  } else {
    if (circleTurn) {
      winningMessageTextElement.innerHTML = "O Wins";
      winningMessage.classList.add("circle");
    } else {
      winningMessageTextElement.innerHTML = "X Wins";
      winningMessage.classList.add("x");
    }
  }
  winningMessage.classList.add("show");
}

function isDraw() {
  // check all cells have been filled
  // destructure cellElements so it can be looped through
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoard() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  // loops through combinations and returns true
  // if any of the values inside are true
  return WINNING_COMBOS.some((combination) => {
    // check all combinations of the same class (X or O)
    return combination.every((index) => {
      // if current class is in all 3 positions
      // of a WINNING_COMBO then returns true
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
