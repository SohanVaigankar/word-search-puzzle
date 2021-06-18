import { keywords } from "./keywordList.js";

const progressBar = document.querySelector(".progress-bar");
const puzzleInfoBlock = document.querySelector(".puzzle-info-block");
const restartButton = document.querySelector(".restart");

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
const level = { level_count: 3, no_of_words: 7 };

document.querySelector(
  ".level-status"
).textContent = `Level ${level.level_count}`;

// Creates a list of kwywords based of the level specified
function generateWordList() {
  let info_title = "";
  let wordList = [];
  keywords.forEach((object) => {
    switch (level.level_count) {
      case 1:
        // For level 1: easy
        info_title = "Word List";
        if (object.one_liner === "" && object.story === "") {
          wordList.push(object.word);
        }
        break;
      case 2:
        // For level 2 : medium
        info_title = "Stories";
        if (object.story !== "") {
          wordList.push(object.word);
        }
        break;
      case 3:
        // For level 3: hard
        info_title = "One Liners";
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
  puzzleInfoBlock.innerHTML = `<p class="info-title px-5 mx-4 display-3 pt-3 pb-3 text-decoration-underline">${info_title}</p>`;
  for (let i = 0; i < level.no_of_words; i++) {
    puzzleInfoBlock.innerHTML += `<p class="word p-1 px-5 mx-4 text-start">${
      i + 1 + ` . ` + wordList[Math.floor(Math.random() * wordList.length)]
    }</p>`;
  }

  console.log(wordList);
}

// Restarts the puzzle at current level
restartButton.addEventListener("click", () => {
  createGrid();
  generateWordList();
  clearInterval(interval);
  interval = 0;
  current_progress = 0;
  // updateProgressBar(current_progress);
  progressBar.setAttribute("style", `width:${current_progress}%`);
  progressBar.setAttribute("aria-valuenow", current_progress);
  setTimeout(() => {
    progressBarFun();
  }, 1000);
});
