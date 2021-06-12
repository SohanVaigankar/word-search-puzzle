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


// TODO: 