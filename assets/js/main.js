import { keywords, story } from "./keywordList.js";

const progressBar = document.querySelector(".progress-bar");
const restartButton = document.querySelector(".restart");
const scoreElement = document.querySelector(".score-span");
let score = 0;
let correctFlag = false;
let hintUsed = false;
let showAnswerFlag = false;
let interval = 0;
console.log(keywords.length);

// Bulb Icon for Hint button
const hintSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
<path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
</svg>`;

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

var level = { level_count: 1, no_of_words: 7 };

document.querySelector(
  ".level-status"
).textContent = `Level ${level.level_count}`;

// levelInitializer creates a wordList array of keywords for the current level
function levelInitializer(object, level_count, wordList) {
  switch (level_count) {
    case 1:
      if (object.one_liner === "") {
        wordList.push(object.word);
      }
      break;

    case 2:
      break;

    case 3:
      if (object.one_liner !== "") {
        wordList.push(object.word);
      }
      break;

    default:
      console.error("Invalid Level! Keyword generation failed");
      break;
  }
}

// Creates a list of kwywords based of the level specified
function generateWordList() {
  let info_title = "";
  let wordList = [];
  let instructionList = [];
  let levelClasses = "";

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
      break;
    case 2:
      // For level 2: medium
      info_title = "Story";
      levelClasses = " col margin-left";
      instructionList = [
        "Instruction 1",
        "Instruction 2",
        "Instruction 3",
        "Instruction 4",
      ];
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
      break;
    default:
      console.error(`${level.level_count} doesn't exist!!`);
  }

  keywords.forEach((object) => {
    levelInitializer(object, level.level_count, wordList);
  });

  // Adds required classes to info-display-block
  document.querySelector(
    ".info-display-block"
  ).innerHTML = `<div class="puzzle-info-block ${levelClasses} text-center p-3 display-3"></div>`;

  //Adds content to puzzle-info-block
  const puzzleInfoBlock = document.querySelector(".puzzle-info-block");

  // Displays title A/C to the level
  puzzleInfoBlock.innerHTML = `<p class="info-title noselect px-5 mx-4 display-3 pt-3 pb-3 text-decoration-underline">${info_title}</p>`;

  // Inserts word list into the HTML
  let randomWordList = [];
  let wordIndex = Array.from(Array(wordList.length).keys());
  wordIndex = wordIndex.sort(() => Math.random() - 0.5);
  console.log(wordIndex);

  for (let i = 0; i < level.no_of_words; i++) {
    var currentWord = wordList[wordIndex[i]];
    switch (level.level_count) {
      case 1:
        puzzleInfoBlock.innerHTML += `<p class="word noselect p-1 px-5 mx-4 text-start">${
          i + 1 + ` . ` + currentWord
        }</p>`;
        break;
      case 2:
        // This case is added just to avoid logging 'INCORRECT Level' error
        break;
      case 3:
        insertOneLiner(
          i,
          puzzleInfoBlock,
          hintSVG,
          keywords.find(({ word }) => word === currentWord).one_liner
        );
        break;
      default:
        console.error("Invalid Level");
        break;
    }
    randomWordList.push(currentWord);
  }
  console.log("WordList:" + wordList);
  console.log("Random Word List:" + randomWordList);

  // Displays stories inside a carousel if level.levelcount=2
  if (level.level_count === 2) {
    puzzleInfoBlock.innerHTML += `<div id="carousel" class="carousel carousel-dark " data-bs-ride="carousel">
    <div class="carousel-indicators"></div>
    <div class="carousel-inner h-100 w-100"></div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </button>
    </div>`;
    // Math.floor(Math.random() * story.length)
    const selectStory = story[1];
    console.log(selectStory);
    console.log("Story:" + selectStory.part[0].content);
    const carouselIndicators = document.querySelector(".carousel-indicators");
    const carouselInner = document.querySelector(".carousel-inner");

    // Adding a span tag and class to all the keywords for hint system
    let temp = [];
    for (let i = 0; i < selectStory.part.length; i++) {
      for (let j = 0; j < selectStory.part[i].words.length; j++) {
        // console.log(selectStory.part[i].words[j]);
        temp[i] = selectStory.part[i].content.replaceAll(
          selectStory.part[i].words[j],
          `<span class="story-hint">${selectStory.part[i].words[j]}</span>`
        );
      }
      // console.log(temp);
    }

    for (let i = 0; i < selectStory.part.length; i++) {
      console.log(i);
      if (i === 0) {
        carouselIndicators.innerHTML = `
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label=${
          "Slide" + i + 1
        }></button>`;
        carouselInner.innerHTML = `
          <div class="carousel-item h-100 w-100 active ">
          <p class="story-text mt-3 p-4 ">${temp[i]}</p>
          <div class="carousel-caption d-flex">
          <div class="h-100 w-5"></div>
          <h5 class="part-status text-colorrrr fs-1 ">${"Part " + (i + 1)}</h5>
          <button type="button" class="btn hint-button btn-lg btn-primary fs-3">${hintSVG} Hint</button> </div>
          </div>`;
      } else {
        carouselIndicators.innerHTML += `
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="${i}" aria-label=${
          "Slide" + (i + 1)
        }></button>`;
        carouselInner.innerHTML += `
          <div class="carousel-item h-100 w-100">
          <p class="story-text mt-3 p-4  text-start">${temp[i]}</p>
          <div class="carousel-caption display-5 d-flex ">
          <div class="h-100 w-5"></div>
          <h5 class="part-status text-colorrrr fs-1 ">${"Part " + (i + 1)}</h5>
          <button type="button" class="btn hint-button btn-lg btn-primary fs-3">${hintSVG} Hint</button>
          </div>
          </div>`;
      }
    }
  }

  // Adds instructions to the offcanvas
  document.querySelector(
    ".offcanvas-body"
  ).innerHTML = `<ol class="instructions-ol  align-items-start" mx-2 p-4> </ol>`;
  document.querySelector(".offcanvas-body ol").innerHTML = "";
  instructionFun(instructionList);
}

function insertOneLiner(i, puzzleInfoBlock, hintSVG, one_liner) {
  puzzleInfoBlock.innerHTML += `<div class="oneliner row noselect p-1 px-5 mx-4">
  <p class=" p-2 col-1 text-start">${i + 1 + ` . `}</p>
  <p class="col one-liner-content p-2 text-start ">
  ${one_liner}
  </p>
  <button type="button" class="btn hint-button btn-lg btn-primary col-1 text-center m-auto fs-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
  ${hintSVG} Hint</button>
  </div>`;
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

// Score
function updateScore(correctFlag, hintFlag, showAnswerFlag) {
  let incrementValue = 10;
  if (correctFlag === true && hintFlag === true)
    score = score + incrementValue / 2;
  else if (correctFlag) score = score + incrementValue;
  // else if(correctFlag && hintFlag) score = score + (incrementValue/2);

  scoreElement.textContent = score;
}

updateScore(correctFlag, hintUsed, showAnswerFlag);

/* 
// Level system

function changeLevel(correct, counter, no_of_wordsx) {
  if (correct === true) {
    counter++;
    if (counter === no_of_wordsx) {
      level_counter++;
      console.log("level counter " + level_counter);
      console.log("Level Finshed");
      // generateWordList(level_count);
    }
    return counter;
  }
}

let correct = true;
let counter = 0;
let level_counter = 1;
let no_of_wordsx = 10;

changeLevel(true, counter, no_of_wordsx)
*/
