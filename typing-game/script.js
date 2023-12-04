const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingBtn = document.getElementById("setting-btn");
const setting = document.getElementById("setting");
const settingForm = document.getElementById("setting-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Init word

let randomWord;
// Init score
let score = 0;

// Init time
let time = 10;
// set difficulty to local storge
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "meduim";

// set  difficulty select value
difficultySelect.value = difficulty;
// Foucs on text on start
text.focus();
// Start counting down
const timeInterval = setInterval(updatetime, 1000);
// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word DOM
function addWordDOM() {
  word.innerText = getRandomWord();
}
// Update score();
function updateScore() {
  score++;
  scoreEl.innerText = score;
}
// Update time
function updatetime() {
  time--;
  timeEl.innerText = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}
// Game over , show end screen
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your finail score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = "flex";
}
addWordDOM();
// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === word.innerText) {
    addWordDOM();
    updateScore();
    // Clear
    e.target.value = "";
    if (difficultySelect.value === "easy") {
      time += 5;
    } else if (difficultySelect.value === "meduim") {
      time += 3;
    } else {
      time += 2;
    }
    updatetime();
  }
});

// settings btn click

settingBtn.addEventListener("click", () => {
  setting.classList.toggle("hide");
});

// settings select
settingForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
