const alphabetContainer = document.getElementById("alphabetContainer");
const answerContainer = document.getElementById("answerContainer");
const livesContainer = document.getElementById("livesContainer");
const resetBtn = document.getElementById("resetBtn");
const answerList = document.getElementById("answerList");
const revealedAnswer = document.getElementById("revealedAnswer");
const rulesBtn = document.getElementById("rulesBtn");
const rulesModalContainer = document.getElementById("rulesModalContainer");
const closeBtn = document.getElementById("closeBtn");
const loseModalContainer = document.getElementById("loseModalContainer");
const loseContainer = document.getElementById("loseContainer");
const loseResetBtn = document.getElementById("loseResetBtn");

// Canvas stuff
const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");
//

let lives = 9;
let guess;
let counter = 0;

const words = [
  "pear",
  "apple",
  "banana",
  "mango",
  "lemon",
  "pineapple",
  "strawberry",
  "orange",
  "blackberry",
  "lemon",
  "raspberry",
];

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
  if (e.target.id !== "alphabetContainer") {
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
        addBody();
        // alert(`
        // You lose!

        // Correct answer: ${chosenWord}`);
        loseModalContainer.classList.add("active");
        alphabetContainer.classList.add("disabled");
        loseContainer.innerHTML = `<p>You lose! </p> 
        <p>Correct answer: ${chosenWord}</p>`;
        lives = 0;
        // revealedAnswer.innerHTML = `Answer: ${chosenWord}`;
        // livesContainer.innerHTML = `Lives Remaining ${lives}`;
      } else {
        addBody();
        lives -= 1;
        // livesContainer.innerHTML = `Lives remaining ${lives}`;
        letters.disabled = "true";
      }
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

    answerList.appendChild(guess);
  }
};

// Creating start of game
const createGameStart = () => {
  // livesContainer.innerHTML = `Lives Remaining: ${lives}`;

  generateAnswer();
  alphabetContainer.innerHTML = createButtons();
  alphabetContainer.addEventListener("click", handleLetterClick);
};

//DRAW HANGMAN
Draw = (part) => {
  switch (part) {
    case "gallows":
      context.strokeStyle = "#fff";
      context.lineWidth = 10;
      context.beginPath();
      context.moveTo(175, 225);
      context.lineTo(5, 225);
      context.moveTo(40, 225);
      context.lineTo(25, 5);
      context.lineTo(100, 5);
      context.lineTo(100, 25);
      context.stroke();
      break;

    case "head":
      context.lineWidth = 5;
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      break;

    case "body":
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 140);
      context.stroke();
      break;

    case "rightHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(60, 100);
      context.stroke();
      break;

    case "leftHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(140, 100);
      context.stroke();
      break;

    case "rightLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(80, 190);
      context.stroke();
      break;

    case "rightFoot":
      context.beginPath();
      context.moveTo(82, 190);
      context.lineTo(70, 185);
      context.stroke();
      break;

    case "leftLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(125, 190);
      context.stroke();
      break;

    case "leftFoot":
      context.beginPath();
      context.moveTo(122, 190);
      context.lineTo(135, 185);
      context.stroke();
      break;
  }
};
const draws = [
  "gallows",
  "head",
  "body",
  "rightHarm",
  "leftHarm",
  "rightLeg",
  "leftLeg",
  "rightFoot",
  "leftFoot",
];
let step = 0;
//Add next body part
const addBody = () => {
  Draw(draws[step++]);
  if (undefined === draws[step]) this.disabled = true;
};

// Modal open and close
const modalOpen = () => {
  rulesModalContainer.classList.add("active");
};

const modalClose = () => {
  rulesModalContainer.classList.remove("active");
};

// Event listeners
alphabetContainer.addEventListener("click", handleLetterClick);
resetBtn.addEventListener("click", () => {
  location.reload();
});

loseResetBtn.addEventListener("click", () => {
  location.reload();
});

rulesBtn.addEventListener("click", modalOpen);
closeBtn.addEventListener("click", modalClose);

window.onload = createGameStart();
