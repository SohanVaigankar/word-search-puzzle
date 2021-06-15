import { keywords } from "./keywordList.js";

var progressBar = document.querySelector(".progress-bar");

console.log(keywords);

// Progress bar
function progressBarFun(current_progress, timeLimit) {
  var interval = setInterval(function () {
    current_progress += 1 / timeLimit;
    console.log(current_progress);
    progressBar.setAttribute("style", `width:${current_progress}%`);
    progressBar.setAttribute("aria-valuenow", current_progress);
    if (current_progress >= 100) clearInterval(interval);
  }, 10);
}

var current_progress = 0;
var timeLimit = 60;
progressBarFun(current_progress, timeLimit);


// TODO: Grid implementation
window.addEventListener('DOMContentLoaded', (event) => {
    const mainGrid = document.querySelector('.grid');
    const width = 13;
    let gridSlots = [];

    (function createGrid() {
        for (let i = 0; i < 169; i++) {
            const gridSlot = document.createElement("div");
            gridSlot.innerHTML = String.fromCharCode(97+Math.floor(Math.random() * 26));
            mainGrid.appendChild(gridSlot);
            gridSlots.push(gridSlot);
        }
    })();
});