import { keywords } from "./keywordList.js";

const progressBar = document.querySelector(".progress-bar");
const restartButton = document.querySelector(".restart");
const instructionButton = document.querySelector(".instructions");

let interval = 0;
console.log(keywords.length);

// To generate & store random words from 'keywordList.js'

// Progress bar
function updateProgressBar() {
  if (current_progress >= 0 && current_progress <= 100) {
    current_progress += 1 / timeLimit;
    // console.log(current_progress);
    progressBar.setAttribute("style", `width:${current_progress}%`);
    progressBar.setAttribute("aria-valuenow", current_progress);
  } else {
    clearInterval(interval);
    interval = 0;
  }
}

function progressBarFun() {
  interval = setInterval(updateProgressBar, 10);
}

let current_progress = 0;
let timeLimit = 60;

// Function to display instructions
function instructionFun(instructionList) {
  let count = 0;
  instructionList.forEach((instruction) => {
    document.querySelector(
      ".instructions-ol"
    ).innerHTML += ` <list mx-2 p-4 text-center>${
      ++count + ". " + instruction
    }</list>`;
  });
}

// Grid implementation
const mainGrid = document.querySelector(".grid");
let gridSize = 13;
let row = 0;
let col = 0;

function createGrid() {
  mainGrid.innerHTML = "";
  for (row = 0; row < gridSize; row++) {
    for (col = 0; col < gridSize; col++) {
      mainGrid.innerHTML += `<div>${String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      )}</div>`;
    }
  }
}

// This block runs initially when the webpage is loaded
window.addEventListener("DOMContentLoaded", (event) => {
  createGrid();
  progressBarFun();
  generateWordList();
});

// Code to change word list according to the current level

// Updates Level status
const level = { level_count: 3, no_of_words: 9 };

document.querySelector(
  ".level-status"
).textContent = `Level ${level.level_count}`;

// Creates a list of kwywords based of the level specified
function generateWordList() {
  let info_title = "";
  let wordList = [];
  let instructionList = [];
  // document.querySelector('.info-display-block div').classList.remove(colSize);
  let levelClasses = "";
  keywords.forEach((object) => {
    switch (level.level_count) {
      case 1:
        // For level 1: easy
        info_title = "Word List";
        levelClasses = " col-5";
        instructionList = [
          "Instruction 1",
          "Instruction 2",
          "Instruction 3",
          "Instruction 4",
        ];
        if (object.one_liner === "" && object.story === "") {
          wordList.push(object.word);
        }
        break;
      case 2:
        // For level 2 : medium
        info_title = "Stories";
        levelClasses = " col margin-left";
        instructionList = [
          "Instruction 1",
          "Instruction 2",
          "Instruction 3",
          "Instruction 4",
        ];
        if (object.story !== "") {
          wordList.push(object.word);
        }
        break;

      case 3:
        // For level 3: hard
        info_title = "One Liners";
        levelClasses = " col margin-left";
        instructionList = [
          "Instruction 1",
          "Instruction 2",
          "Instruction 3",
          "Instruction 4",
        ];
        if (object.one_liner !== "") {
          wordList.push(object.word);
        }
        break;
      default:
        console.error("Invalid Level! Keyword generation failed");
        break;
    }
  });

  // Inserts word list into the HTML
  let randomWordList = [];
  let wordIndex = Array.from(Array(wordList.length).keys());
  wordIndex = wordIndex.sort(() => Math.random() - 0.5);
  console.log(wordIndex);

  // Adds required classes to nfo-display-block
  document.querySelector(
    ".info-display-block"
  ).innerHTML = `<div class="puzzle-info-block ${levelClasses} text-center p-3 display-3">
                  </div>`;

  //Adds content to puzzle-info-block
  const puzzleInfoBlock = document.querySelector(".puzzle-info-block");

  // Displays title A/C to the level
  puzzleInfoBlock.innerHTML = `<p class="info-title noselect px-5 mx-4 display-3 pt-3 pb-3 text-decoration-underline">${info_title}</p>`;

  // Displays stories inside a carousel if level.levelcount=2
  if (level.level_count === 2) {
    puzzleInfoBlock.innerHTML += `<div id="carouselExampleCaptions" class="carousel bg-dark" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="..." class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
  }

  // Adds instructions to the offcanvas
  document.querySelector(
    ".offcanvas-body"
  ).innerHTML = `<ol class="instructions-ol  align-items-start" mx-2 p-4> </ol>`;
  document.querySelector(".offcanvas-body ol").innerHTML = "";

  for (let i = 0; i < level.no_of_words; i++) {
    var currentWord = wordList[wordIndex[i]];
    switch (level.level_count) {
      case 1:
        puzzleInfoBlock.innerHTML += `<p class="word noselect p-1 px-5 mx-4 text-start">${
          i + 1 + ` . ` + currentWord
        }</p>`;
        break;
      case 3:
        puzzleInfoBlock.innerHTML += `<p class="oneliner noselect p-1 px-5 mx-4 text-start">${
          i + 1 + ` . ` + keywords.find(({ word }) => word === currentWord).one_liner
        }</p>`;
        break;
      default:
        console.error("Invalid Level");
    }
    randomWordList.push(currentWord);
  }

  console.log();
  instructionFun(instructionList);
  console.log("WordList:" + wordList);
  console.log("Random Word List:" + randomWordList);
}

// Restarts the puzzle at current level
restartButton.addEventListener("click", () => {
  createGrid();
  generateWordList();
  clearInterval(interval);
  interval = 0;
  current_progress = 0;
  progressBar.setAttribute("style", `width:${current_progress}%`);
  progressBar.setAttribute("aria-valuenow", current_progress);
  setTimeout(() => {
    progressBarFun();
  }, 1000);
});

// Instrction Button
instructionButton.addEventListener("click", (event) => {});
