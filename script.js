var guessNumberSelect = document.querySelector(".inputNumber");
var submitBtn = document.querySelector(".inputButton");
var resetBtn = document.querySelector(".resetButton");
var numDisplay = document.querySelector(".numDisplay");
var messageDisplay = document.querySelector(".message");
var clearBtn = document.querySelector("#clearBtn");
var pickMinMax = document.querySelector("#choose-range");
var minDisplay = document.querySelector("#min-display");
var maxDisplay = document.querySelector("#max-display");
var twoPlayerOption = document.querySelector("#two-player-Btn");


var previousGuess = 0;
var randomNum = null;
var integerValue = parseInt(guessNumberSelect.value);
var maxNumber = 100;
var minNumber = 0;



generateRandomNum();
originalBtnStates();
resetBtn.disabled = true;
handleNumberOutRange();
noNumberInput();
enableButton();



function changeMinMaxDisplay() {
  minDisplay.textContent = minNumber;
  maxDisplay.textContent = maxNumber;
}

function checkNumber() {
  if (previousGuess < randomNum) {
    messageDisplay.textContent = "Number is too low";
  } else if (previousGuess > randomNum) {
    messageDisplay.textContent = "Number is too high";
  } else {
    messageDisplay.textContent = "BOOM!";
    winGame();
  }
  handleNumberOutRange();
}

function clearInputValue() {
  //clear input value
  guessNumberSelect.value = "";
}

function enableButton() {
  if (guessNumberSelect.value) {
    submitBtn.disabled = false;
    clearBtn.disabled = false;
    resetBtn.disabled = false;
  }
  noNumberInput();
}

function generateRandomNum() {
  randomNum = Math.floor((Math.random() * (maxNumber - minNumber + 1)) + minNumber);
}

function handleNumberOutRange() {
  if (parseInt(guessNumberSelect.value) < minNumber || parseInt(guessNumberSelect.value) > maxNumber) {
    messageDisplay.textContent = "Please choose a number within the specified range";
    numDisplay.textContent = "ERROR!";
    originalBtnStates();
    clearInputValue();
  }
}

function increaseMinMax() {
  maxNumber = maxNumber + 10;
  minNumber = minNumber - 10;
}

function noNumberInput() {
  if(guessNumberSelect.value == "") {
    originalBtnStates();
  }
}

function originalBtnStates() {
  submitBtn.disabled = true;
  clearBtn.disabled = true;
}

function winGame() {
  originalBtnStates();
  increaseMinMax();
  changeMinMaxDisplay();
  generateRandomNum();
}



clearBtn.addEventListener("click", function() {
  clearInputValue();
})

guessNumberSelect.addEventListener("input", function() {
  enableButton();
})

pickMinMax.addEventListener("click", function() {
  minNumber = parseInt(prompt("what min number?"));
  maxNumber = parseInt(prompt("what max number?"));
  generateRandomNum();
  changeMinMaxDisplay();
});

resetBtn.addEventListener("click", function() {
  generateRandomNum();
  previousGuess = 0;
  guessNumberSelect.value= null;
  numDisplay.textContent = "?";
  messageDisplay.textContent = "Guess a Number";
  originalBtnStates();
  resetBtn.disabled = true;
})

submitBtn.addEventListener("click", function() {
  console.log("guessNumberSelect ", guessNumberSelect)
  previousGuess = parseInt(guessNumberSelect.value);
  numDisplay.textContent = previousGuess;
  checkNumber();
  handleNumberOutRange();
})

//Two-Player option (really as many players if we ask for # input for player #)
//create an object for each player
  //need a number input for this
  //add a player 1 and player 2 object, so that we can keep track of guess amount (and guesses)
  //when button is clicked:
    //Text above Guess Field shows up ("Player 1 Guess")
    //Text above Guess Field shows up ("Player 2 Guess") after Player 1 has pressed Submit and the guess is validated
    //Once a guess is correct, a loop will run through index values in key:value pair array (player1: [guess1, guess2, guess3]), and return key of correct value in array


//add a timer


//add a certain amount of guesses each player can make
//a message that says how many guesses each player has left


//ask about making it so that input fields don't even accpet putting in values outside of range
