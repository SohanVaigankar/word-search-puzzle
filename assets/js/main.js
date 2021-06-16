import { keywords } from "./keywordList.js";

const progressBar = document.querySelector(".progress-bar");
const puzzleInfoBlock = document.querySelector(".puzzle-info-block");

console.log(keywords.length);

// To generate & store random words from 'keywordList.js'
// const wordList = [];

// Progress bar
function progressBarFun(current_progress, timeLimit) {
  var interval = setInterval(function () {
    current_progress += 1 / timeLimit;
    // console.log(current_progress);
    progressBar.setAttribute("style", `width:${current_progress}%`);
    progressBar.setAttribute("aria-valuenow", current_progress);
    if (current_progress >= 100) clearInterval(interval);
  }, 10);
}

var current_progress = 0;
var timeLimit = 60;
progressBarFun(current_progress, timeLimit);

// Grid implementation
window.addEventListener("DOMContentLoaded", (event) => {
  const mainGrid = document.querySelector(".grid");
  const width = 13;
  let gridSlots = [];

  (function createGrid() {
    for (let i = 0; i < 169; i++) {
      const gridSlot = document.createElement("div");
      gridSlot.innerHTML = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      );
      mainGrid.appendChild(gridSlot);
      gridSlots.push(gridSlot);
    }
  })();
});

// Code to change word list according to the current level

const level = { level_count: 2, no_of_words: 7 };

// function generateWordList(level) {
// level = 1

// }
let info_title = "";
let wordList = [];
keywords.forEach((object) => {
  switch (level.level_count) {
    case 1:
      info_title = "Word List";
      if (object.one_liner === "" && object.story === "") {
        wordList.push(object.word);
      }
      break;
    case 2:
      info_title = "Stories";
      if (object.story !== "") {
        wordList.push(object.word);
      }
      break;
    case 3:
      info_title = "One Liners";
      if (object.one_liner !== "") {
        wordList.push(object.word);
      }
      break;
    default:
      console.error("Keyword generation failed");
      break;
  }
});

var i;

  puzzleInfoBlock.innerHTML = `<p class="info-title px-5 mx-4 display-3 pt-3 pb-3 text-decoration-underline">${info_title}</p>`;
  for (i = 0; i < level.no_of_words; i++) {
    puzzleInfoBlock.innerHTML += `<p class="word p-1 px-5 mx-4 text-start">${
      i + 1 + ` . ` + wordList[Math.floor(Math.random() * wordList.length) + 1]
    }</p>`;
  }


console.log(wordList);
