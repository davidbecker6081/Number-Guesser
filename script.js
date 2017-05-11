var guessNumberSelect = document.querySelector(".input-number");
var submitBtn = document.querySelector(".input-button");
var resetBtn = document.querySelector(".reset-button");
var numDisplay = document.querySelector(".num-display");
var messageDisplay = document.querySelector(".message");
var clearBtn = document.querySelector("#clear-btn");
var pickMinMax = document.querySelector("#choose-range");
var minDisplay = document.querySelector("#min-display");
var maxDisplay = document.querySelector("#max-display");
var submitRange = document.querySelector("#submit-range");

var previousGuess = 0;
var randomNum = null;
var integerValue = parseInt(guessNumberSelect.value);
var maxNumber = 100;
var minNumber = 0;
var winCounter = 0;
minDisplay.disabled = true;
maxDisplay.disabled = true;
minDisplay.value = 0;
maxDisplay.value = 100;

initialState();

function addBlinking() {
  minDisplay.style["animation-play-state"] = "running";
  maxDisplay.style["animation-play-state"] = "running";

  setTimeout(function () {
    minDisplay.style["animation-play-state"] = "paused";
    maxDisplay.style["animation-play-state"] = "paused";
  }, 3000)

}

function addBlinkingGuess() {
  guessNumberSelect.style["animation-play-state"] = "running";
}

function changeMinMaxDisplay() {
  minDisplay.value = minNumber;
  maxDisplay.value = maxNumber;
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
  addBlinkingGuess();
  submitRange.disabled = true;
  focusState();
}

// function initialStateTwoPlayer() {
//   generateRandomNum();
//   originalBtnStates();
//   resetBtn.disabled = true;
// // need to rewrite for two player options
//   handleNumberOutRange();
//   noNumberInput();
//   enableButton();
//   twoPlayerCheck();
// }

function minMaxDisplayDisabled() {
  minDisplay.disabled = false;
  maxDisplay.disabled = false;
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
  minDisplay.disabled = true;
  maxDisplay.disabled = true;
}

function numDisplayInvalid() {
  minDisplay.value = "?";
  maxDisplay.value = "?";
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

function refocusMinMax() {
  minDisplay.value = null;
  maxDisplay.value = null;
}

function submit() {
  if(guessNumberSelect.value) {
    previousGuess = parseInt(guessNumberSelect.value);
  }
  numDisplay.textContent = previousGuess;
  checkNumber();
  handleNumberOutRange();
  clearInputValue();
  focusState();
  originalBtnStates();
}

// function twoPlayerCheck() {
//   if(twoPlayerCounter % 2 !== 0) {
//     messageDisplay.textContent = "Player 1 Wins!"
//   } else {
//     messageDisplay.textContent = "Player 2 Wins!"
//   }
// }


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
  generateRandomNum();
  if (winCounter < 2) {
      numDisplay.textContent = "Winner! Try Range Difficulty " + (winCounter+1);
  } else if (winCounter === 2) {
      numDisplay.textContent = "Hot Shot! Try Range Difficulty " + (winCounter+1);
  } else if (winCounter >= 3) {
      numDisplay.textContent = "Are you cheating? No Way " + winCounter + " times!";
  }
  addBlinking();
}

clearBtn.addEventListener("click", function() {
  clearInputValue();
  focusState();
  originalBtnStates();
});

guessNumberSelect.addEventListener("input", function() {
  enableButton();
});

pickMinMax.addEventListener("click", function() {
  minMaxDisplayDisabled();
  resetBtn.disabled = false;
  refocusMinMax();
  guessNumberSelect.disabled = true;
  submitRange.disabled = false;
  minDisplay.focus();
});

submitRange.addEventListener("click", function() {
  minNumber = parseInt(minDisplay.value);
  maxNumber = parseInt(maxDisplay.value);
  if (minNumber === maxNumber) {
      minMaxInvalidEntry();
      minDisplay.focus();
  } else if (isNaN(minNumber) || isNaN(maxNumber)) {
      minMaxInvalidEntry();
      minDisplay.focus();
  } else if (minNumber >= maxNumber) {
      minGreaterThanMax();
      minDisplay.focus();
  } else {
    generateRandomNum();
    numDisplay.textContent = "?";
    messageDisplay.textContent = "Guess a Number";
    guessNumberSelect.disabled = false;
    guessNumberSelect.placeholder = "Enter Your Guess";
    focusState();
  }
})

resetBtn.addEventListener("click", function() {
  previousGuess = 0;
  guessNumberSelect.value= null;
  numDisplay.textContent = "?";
  messageDisplay.textContent = "Guess a Number";
  originalMinMax();
  winCounter = 0;
  // twoPlayerCounter = 0;
  minDisplay.disabled = true;
  maxDisplay.disabled = true;
  addBlinking();
  initialState();
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



// // Two Player option -
// var twoPlayerCounter = 0
// twoPlayerOption.addEventListener("click", function() {
//   function initialStateTwoPlayer() {
//     generateRandomNum();
//     originalBtnStates();
//     resetBtn.disabled = true;
//     handleNumberOutRange();
//     noNumberInput();
//     enableButton();
//   }
// });
//
// function twoPlayerCheck() {
//   if(twoPlayerCounter % 2 !== 0) {
//     messageDisplay.textContent = "Player 1 Wins!"
//   } else {
//     messageDisplay.textContent = "Player 2 Wins!"
//   }
// }






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
