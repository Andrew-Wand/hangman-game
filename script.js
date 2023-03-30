const alphabetContainer = document.getElementById("alphabetContainer");
const answerContainer = document.getElementById("answerContainer");

let answer = "";
let lives = 10;
let wordDisplay = [];

const words = ["derp", "merp", "fart"];

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
};

// Get word from words array
const generateAnswer = (word) => {
  let wordSplit = word.split("");
  for (let i = 0; i < answer.length; i++) {
    if (wordSplit[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
};

// Generate and display random word
const setAnswer = () => {
  const wordOrder = Math.floor(Math.random() * words.length);
  const chosenWord = words[wordOrder];

  answerContainer.innerHTML = generateAnswer(chosenWord);
  answer = chosenWord;
};
setAnswer();

// Creating start of game
const createGameStart = () => {
  let lives = 10;
  let answer = "";
  let wordDisplay = [];

  setAnswer();
  alphabetContainer.innerHTML = createButtons();
  alphabetContainer.addEventListener("click", handleLetterClick);
};

// Event listeners
alphabetContainer.addEventListener("click", handleLetterClick);

window.onload = createGameStart();
