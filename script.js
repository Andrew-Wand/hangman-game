const alphabetContainer = document.getElementById("alphabetContainer");
const answerContainer = document.getElementById("answerContainer");
const livesContainer = document.getElementById("livesContainer");
const resetBtn = document.getElementById("resetBtn");

let answer = "";
let lives = 10;
let wordDisplay = [];
let guess;

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
    } else {
      console.log("bad");
    }
  }

  if (Includes === true) {
    letters.classList.add("correct");
  } else {
    letters.classList.add("incorrect");
    if (lives <= 1) {
      alert("You lose");
    } else {
      lives -= 1;
      livesContainer.innerHTML = `Lives remaining ${lives}`;
    }
  }
};

// Get word from words array
const generateAnswer = () => {
  for (let i = 0; i < chosenWord.length; i++) {
    guess = document.createElement("p");
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
  let answer = "";
  let wordDisplay = [];

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
