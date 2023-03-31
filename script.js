const alphabetContainer = document.getElementById("alphabetContainer");
const answerContainer = document.getElementById("answerContainer");
const livesContainer = document.getElementById("livesContainer");
const resetBtn = document.getElementById("resetBtn");

let lives = 10;
let guess;
let counter = 0;

const words = ["pear", "apple", "banana"];

const wordOrder = Math.floor(Math.random() * words.length);
const chosenWord = words[wordOrder];
const answerSplit = chosenWord.split("");

// Create alphabet buttons for guessing
const createButtons = () => {
  let alphabetBtn = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) => `
    <button class="alphabetBtn" id="${letter}">
        ${letter}
    </button>
  `
    )
    .join("");
  return alphabetBtn;
};

// Handle clicking alphabet buttons
const handleLetterClick = (e) => {
  let currentGuess = e.target.id;
  let letters = document.getElementById(e.target.id);
  Includes = answerSplit.includes(currentGuess);

  for (let i = 0; i < chosenWord.length; i++) {
    let g = document.getElementById(`guess${i}`);
    if (answerSplit[i] === currentGuess) {
      g.innerHTML = currentGuess;
      counter += 1;
    }
  }

  if (Includes === true) {
    letters.classList.add("correct");
    letters.disabled = "true";
    if (counter === chosenWord.length) {
      console.log("You win!");
      alphabetContainer.classList.add("disabled");
    }
  } else {
    letters.classList.add("incorrect");
    if (lives <= 1) {
      alert("You lose");
    } else {
      lives -= 1;
      livesContainer.innerHTML = `Lives remaining ${lives}`;
      letters.disabled = "true";
    }
  }
};

// Get word from words array
const generateAnswer = () => {
  for (let i = 0; i < chosenWord.length; i++) {
    guess = document.createElement("li");
    guess.setAttribute("id", `guess${i}`);
    guess.setAttribute("class", `guess`);
    if (answerSplit[i] !== "-") {
      guess.innerHTML = "_";
    } else {
      guess.innerHTML = "-";
    }

    answerContainer.appendChild(guess);
  }
};

// Creating start of game
const createGameStart = () => {
  let lives = 10;

  livesContainer.innerHTML = `Lives Remaining: ${lives}`;

  generateAnswer();
  alphabetContainer.innerHTML = createButtons();
  alphabetContainer.addEventListener("click", handleLetterClick);
};

// Event listeners
alphabetContainer.addEventListener("click", handleLetterClick);
resetBtn.addEventListener("click", () => {
  location.reload();
});

window.onload = createGameStart();
