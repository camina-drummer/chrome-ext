// webgazerVideoContainer = document.getElementById("webgazerVideoContainer");
// webgazerVideoContainer.style.display = "none";
console.log("yeah");

// create a control panel
const controlPanel = document.createElement("div");
const start = document.createElement("button");
start.textContent = "start!";
controlPanel.appendChild(start);
const stopButton = document.createElement("button");
stopButton.textContent = "stop!";
controlPanel.appendChild(stopButton);
const numberSeconds = document.createElement("input");
numberSeconds.setAttribute("type", "number");
controlPanel.appendChild(numberSeconds);

stopButton.addEventListener("click", clearStop);
start.addEventListener("click", initiate);

// const stop = document.getElementById("stopButton");
// const seconds = document.getElementById("timeInputSeconds");

// append to the top of the page
document
  .querySelector("body")
  .insertBefore(controlPanel, document.querySelector("body").firstChild);

function clearStop() {
  console.log("clear the watcher");
  webgazer.clearGazeListener();
  const coverElement = document.getElementById("cover-element");
  coverElement.style.backgroundImage =
    "url('https://www.meme-arsenal.com/memes/43a4a3e6cf0880810edcfaec710c4cd9.jpg') ";
  coverElement.style.backgroundSize = "cover";
}

function initiate() {
  const timeToStop = numberSeconds.value * 1000; // 1500000 pomodoro timer time

  console.log("running with time to blur:", timeToStop);
  let timeSinceLastMove = 0;

  // create a div that has an image
  const coverElement = document.createElement("div");
  coverElement.setAttribute("id", "cover-element");
  const dot = document.querySelector("#webgazerGazeDot");
  // coverElement.style.background = "white";
  // coverElement.backgroundImage = `url('./images/mike.png')`;
  coverElement.style.display = "block";
  coverElement.style.position = "absolute";
  coverElement.style.height = "100px";
  coverElement.style.width = "100px";
  coverElement.style.borderRadius = "50%";
  document.querySelector("body").appendChild(coverElement);

  let xprediction;
  let yprediction;

  webgazer.showVideo(false);

  webgazer
    .setGazeListener(function (data, elapsedTime) {
      if (data == null) {
        return;
      }

      xprediction = data.x; //these x coordinates are relative to the viewport
      yprediction = data.y; //these y coordinates are relative to the viewport

      // reset the size and position of the image based on
      // time and xprediction, yprediction

      if (elapsedTime >= timeToStop) {
        clearStop();

        // coverElement.backgroundImage = `url('./images/mike.png')`;
      }

      if (elapsedTime - timeSinceLastMove > 100) {
        // updatePosition();
        const sizeConstant = (500 * elapsedTime) / timeToStop;
        coverElement.style.top = `${yprediction - sizeConstant / 2}px`;
        coverElement.style.left = `${xprediction - sizeConstant / 2}px`;
        coverElement.style.height = `${sizeConstant}px`;
        coverElement.style.width = `${sizeConstant}px`;
        coverElement.style.opacity = `${elapsedTime / timeToStop}`;
        coverElement.style.boxShadow = `0px 0px ${sizeConstant * 0.2}px ${
          sizeConstant * 0.2
        }px grey`;
        timeSinceLastMove = elapsedTime;
      }
      // console.log(xprediction, yprediction, elapsedTime); //elapsed time is based on time since begin was called
    })
    .begin();

  function updatePosition() {
    coverElement.style.top = `${yprediction}px`;
    coverElement.style.left = `${xprediction}px`;
  }
}

// initiate(15000);
//   const trackerTracker = new MutationObserver(updatePosition)
//   trackerTracker.observe(webGazerDot, {attributes: true})
