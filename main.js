const humanScoreText = document.querySelector("#human-score");
const compScoreText = document.querySelector("#computer-score");
const drawText = document.querySelector("#draw-count");
let roundCount = document.querySelector("#round-count");
const playButton = document.querySelector(".play-button");
const playBox = document.querySelector(".hidden");
const content = document.querySelector(".content");
const resultContainer = document.querySelector("#result-container");
const resultDisplay = document.querySelector("#result-display");

const roundEval = (humanChoice, computerChoice) => {
  if (humanChoice === computerChoice) {
    return 3;
  }

  if (
    (humanChoice === 1 && computerChoice === 3) ||
    (humanChoice === 2 && computerChoice === 1) ||
    (humanChoice === 3 && computerChoice === 2)
  ) {
    return 1;
  } else {
    return 2;
  }
};

function convertHumanChoiceToNumber(str) {
  switch (str) {
    case "rock":
      return 1;
    case "paper":
      return 2;
    case "scissors":
      return 3;
  }
}

const getComputerChoice = () => {
  return Math.floor(Math.random() * 3) + 1;
};

function getHeaderNumber(header, delimeter) {
  const t = header.innerText.split(delimeter);
  return parseInt(t.pop());
}

function updateRound() {
  console.log(getHeaderNumber(roundCount, "#"));
  if (getHeaderNumber(roundCount, "#") >= 5) {
    roundCount.innerText = `Game Over!`;
    return;
  }
  roundCount.innerText = `Round #${getHeaderNumber(roundCount, "#") + 1}`;
}

function updateScoreBox(result) {
  switch (result) {
    case 1:
      humanScoreText.innerText = `You: ${
        getHeaderNumber(humanScoreText, ":") + 1
      }`;
      break;
    case 2:
      compScoreText.innerText = `Computer: ${
        getHeaderNumber(compScoreText, ":") + 1
      }`;
      break;
    case 3:
      drawText.innerText = `Draws: ${getHeaderNumber(drawText, ":") + 1}`;
      break;
  }
}

function displayResult() {
  const humanScore = getHeaderNumber(humanScoreText, ":");
  const computerScore = getHeaderNumber(compScoreText, ":");
  const draws = getHeaderNumber(drawText, ":");
  resultContainer.classList.remove("hidden");

  if (humanScore > computerScore) {
    resultDisplay.innerText = "You won!";
  } else if (computerScore > humanScore) {
    resultDisplay.innerText = "The computer won!";
  } else if (computerScore === humanScore || draws === 5) {
    resultDisplay.innerText = "It's a draw!";
  }
}

const handleButtonClick = (e) => {
  if (e.target.closest(".btn") !== null) {
    humanChoice = e.target.closest(".btn").innerText.toLowerCase().trim();

    const roundResult = roundEval(
      convertHumanChoiceToNumber(humanChoice),
      getComputerChoice()
    );
    if (roundResult === 1 || roundResult === 2 || roundResult === 3) {
      if (getHeaderNumber(roundCount, "#") <= 6) {
        updateRound();
      }
      updateScoreBox(roundResult);
      if (
        getHeaderNumber(humanScoreText, ":") >= 3 ||
        getHeaderNumber(compScoreText, ":") >= 3 ||
        getHeaderNumber(roundCount, "#") >= 5 ||
        (getHeaderNumber(drawText, ":") >= 3 &&
          getHeaderNumber(humanScoreText, ":") >= 1) ||
        (getHeaderNumber(drawText, ":") >= 3 &&
          getHeaderNumber(compScoreText, ":") >= 1)
      ) {
        buttons.removeEventListener("click", handleButtonClick);
        displayResult();
      }
    }
  }
};

const buttons = document.querySelector(".game-buttons");
buttons.addEventListener("click", handleButtonClick);
playButton.addEventListener("click", () => {
  playButton.remove();
  playBox.classList.remove("hidden");
  playBox.classList.add("fade-in");
  content.classList.add("fade-in");
});
