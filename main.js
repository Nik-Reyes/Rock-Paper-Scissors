// Breaking the problem down into smaller bits

// 1.) Create a get function that returns a random number 1-3. THis is the computers choice
// 2.) Create a get function that returns the users human players choice of rock, paper, or scissors
// 3.) Users choice is a word, but computers choice is a number. Create a function that converts the humans choice into a number
// 4.) Human choice and computer choice are now comparible. Create a function that

//write a function that takes the users choice of rock paper or scissors (use prompt method)
//to make sure that the user enters a correct choice and to account for incorrect input, use a while or do while loop. for example, while the input is !== to correct input, call function to prompt again.

//increment the player scores so that the game can end

//whoever reaches the score of 3 first, wins

let roundCount = 1;
let humanScore = 0;
let computerScore = 0;
let computerChoice;
let humanChoice;

function printChoices(player, computer) {
  let userChoiceToText;
  let computerChoiceToText;

  switch (computer) {
    case 1:
      computerChoiceToText = "rock";
      break;
    case 2:
      computerChoiceToText = "paper";
      break;
    case 3:
      computerChoiceToText = "scissors";
      break;
  }

  switch (player) {
    case 1:
      userChoiceToText = "rock";
      break;
    case 2:
      userChoiceToText = "paper";
      break;
    case 3:
      userChoiceToText = "scissors";
      break;
  }

  console.log(`You: ${userChoiceToText}\nComputer: ${computerChoiceToText}`);
}

function printScore(user, computer) {
  console.log(`You: ${user}, Computer: ${computer}`);
}

function evalGame(playerScore, computerScore) {
  if (playerScore === computerScore) {
    console.log("It's a draw!");
    alert("It's a draw!");
  } else if (humanScore > computerScore) {
    console.log("You win!");
    alert("You win!");
  } else {
    console.log("The computer wins!");
    alert("The computer wins!");
  }
}

const getComputerChoice = () => {
  return Math.floor(Math.random() * 3) + 1;
};

const getHumanChoice = () => {
  let choice = prompt("Rock, Paper, or Scissors?").toLowerCase();
  while (!(choice === "rock" || choice === "paper" || choice === "scissors")) {
    alert(`${choice} is not a valid entry`);
    choice = prompt("Rock, Paper, or Scissors?").toLowerCase();
  }
  return convertHumanChoiceToNumber(choice);
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

const roundEval = (userChoice, computerChoice) => {
  printChoices(userChoice, computerChoice);
  if (userChoice === computerChoice) {
    console.log("It's a draw!");
    console.log(`\n`);

    return;
  }

  if (
    (userChoice === 1 && computerChoice === 3) ||
    (userChoice === 2 && computerChoice === 1) ||
    (userChoice === 3 && computerChoice === 2)
  ) {
    console.log("You win this round!");
    console.log(`\n`);
    humanScore++;
  } else {
    console.log("Computer wins this round!");
    console.log(`\n`);
    computerScore++;
  }
};

function gameStart() {
  do {
    //get computer choice
    computerChoice = getComputerChoice();

    //get human choice
    humanChoice = getHumanChoice();

    //evaluate if the player or the computer won
    roundEval(humanChoice, computerChoice);
    roundCount++;
  } while (humanScore < 3 && computerScore < 3 && roundCount <= 5);
}

function runApp() {
  gameStart();
  printScore(humanScore, computerScore);
  evalGame(humanScore, computerScore);
}

runApp();
