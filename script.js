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
var winCounter = 0;

initialState();


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

function checkNumberTwoPlayer() {
  if (previousGuess < randomNum) {
    messageDisplay.textContent = "Number is too low";
  } else if (previousGuess > randomNum) {
    messageDisplay.textContent = "Number is too high";
  } else {
     twoPlayerCheck();
     winGameTwoPlayer();
  }
  handleNumberOutRange();
}

function clearInputValue() {
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

function focusState() {
  guessNumberSelect.focus();
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

function handleNumberOutRangeTwoPlayer() {
  //if counter is even, player 1 guess Again (opposite for player 2)
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

function initialState() {
  generateRandomNum();
  originalBtnStates();
  resetBtn.disabled = true;
  handleNumberOutRange();
  noNumberInput();
  enableButton();
}

function initialStateTwoPlayer() {
  generateRandomNum();
  originalBtnStates();
  resetBtn.disabled = true;
// need to rewrite for two player options
  handleNumberOutRange();
  noNumberInput();
  enableButton();
  twoPlayerCheck();
}


function minGreaterThanMax() {
  numDisplay.textContent = "DON'T BE DUMB!";
  messageDisplay.textContent = "That won't work!";
  guessNumberSelect.placeholder = "Let's use our brain this time";
  guessNumberSelect.disabled = true;
  numDisplayInvalid();
  originalBtnStates();
}

function minMaxInvalidEntry() {
  numDisplay.textContent = "THOSE AREN'T NUMBERS!";
  originalBtnStates();
  guessNumberSelect.disabled = true;
  guessNumberSelect.placeholder = "Don't even think about it!";
  numDisplayInvalid();
}

function numDisplayInvalid() {
  minDisplay.textContent = "?";
  maxDisplay.textContent = "?";
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

function originalMinMax() {
  minNumber = 0;
  maxNumber = 100;
  changeMinMaxDisplay();
}


function submit() {
  previousGuess = parseInt(guessNumberSelect.value);
  numDisplay.textContent = previousGuess;
  checkNumber();
  handleNumberOutRange();
  clearInputValue();
  focusState();
}


function submitTwoPlayer() {
  previousGuess = parseInt(guessNumberSelect.value);
  console.log("previous Guess, ", previousGuess.value)
  numDisplay.textContent = previousGuess;
  checkNumberTwoPlayer();
  handleNumberOutRange();
  clearInputValue();
  focusState();
  submitBtn.addEventListener("click", function() {
    twoPlayerCounter++
    if (previousGuess) {
      checkNumberTwoPlayer();
    }
  })
}

function twoPlayerCheck() {
  if(twoPlayerCounter % 2 == 0 && twoPlayerCounter !== 0) {
    messageDisplay.textContent = "Player 2 Wins!"
  } else {
    messageDisplay.textContent = "Player 1 Wins!"
  }
}


function userMinMaxPrompt() {
  minNumber = parseInt(prompt("what min number?"));
  maxNumber = parseInt(prompt("what max number?"));
}

function userPickRange() {
  generateRandomNum();
  changeMinMaxDisplay();
  numDisplay.textContent = "?";
  messageDisplay.textContent = "Guess a Number";
  guessNumberSelect.disabled = false;
  guessNumberSelect.placeholder = "Enter Your Guess";
  focusState();
}

function winGame() {
  winCounter++;
  originalBtnStates();
  increaseMinMax();
  changeMinMaxDisplay();
  winGameMessages();
  generateRandomNum();
}

function winGameTwoPlayer() {
  originalBtnStates();
  increaseMinMax();
  changeMinMaxDisplay();
  generateRandomNum();
  if (winCounter < 2) {
      numDisplay.textContent = "Winner! Try Range Difficulty " + (winCounter+1);
  } if (winCounter === 2) {
    numDisplay.textContent = "Hot Shot! Try Range Difficulty " + (winCounter+1);
  } if (winCounter >= 3) {
    numDisplay.textContent = "Are you cheating? No Way Again!"
  }
}

function winGameMessages() {
  if (winCounter < 2) {
      numDisplay.textContent = "Winner! Try Range Difficulty " + (winCounter+1);
  } if (winCounter === 2) {
    numDisplay.textContent = "Hot Shot! Try Range Difficulty " + (winCounter+1);
  } if (winCounter >= 3) {
    numDisplay.textContent = "Are you cheating? No Way Again!"
  }
}


clearBtn.addEventListener("click", function() {
  clearInputValue();
  focusState();
});

guessNumberSelect.addEventListener("input", function() {
  enableButton();
});

pickMinMax.addEventListener("click", function() {
  userMinMaxPrompt();
  if (minNumber >= maxNumber) {
      minGreaterThanMax();
  } else if (isNaN(minNumber) || isNaN(maxNumber)) {
      minMaxInvalidEntry();
  } else {
      userPickRange();
  }
  resetBtn.disabled = false;
  originalBtnStates();
});

resetBtn.addEventListener("click", function() {
  generateRandomNum();
  previousGuess = 0;
  guessNumberSelect.value= null;
  numDisplay.textContent = "?";
  messageDisplay.textContent = "Guess a Number";
  originalBtnStates();
  originalMinMax();
  resetBtn.disabled = true;
  counter = 0;
  twoPlayerCounter = 0;
});

submitBtn.addEventListener("click", function() {
  submit();
});

guessNumberSelect.addEventListener("keypress", function(e) {
  if (e.keyCode == 13) {
    submitBtn.click();
  } else {
    return true;
  }
});



// Two Player option
//counter needs to increase everytime the submit button is pressed
var twoPlayerCounter = 0
twoPlayerOption.addEventListener("click", function() {
  console.log('button press two player')
  console.log('previousGuess ', previousGuess)
  initialStateTwoPlayer()
  submitTwoPlayer();
});






//Two-Player option (really as many players if we ask for # input for player #)
//create an object for each player
// var twoPlayerBtn = document.querySelector("#two-player-Btn");
//
//   //when button is clicked:
// twoPlayerBtn.addEventListener("click", function() {
//   //prompt players for # of players, store in variable numOfPlayers
//   var numOfPlayers = prompt("How many players would you like to have?");
//   var numOfPlayersAsNumber = parseInt(numOfPlayers);
//   var playerGuess = previousGuess;
//   var players = {};
//
//   for (var i = 0; i < numOfPlayersAsNumber; i++) {
//     players["player" + i] = playerGuess;
//   }
//   var endNumber =;
//   var counter = 0;
//   //every input needs to be put into value of respective key: value pair
//
// })

    //Text above Guess Field shows up ("Player 1 Guess")
    //Text above Guess Field shows up ("Player 2 Guess") after Player 1 has pressed Submit and the guess is validated
    //Once a guess is correct, a loop will run through index values in key:value pair array (player1: [guess1, guess2, guess3]), and return key of correct value in array

    //another idea


//add a timer


//add a certain amount of guesses each player can make
//a message that says how many guesses each player has left


//ask about making it so that input fields don't even accpet putting in values outside of range
