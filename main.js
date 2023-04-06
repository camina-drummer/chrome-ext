const timeToStop = 15000; // 1500000 pomodoro timer time
let timeSinceLastMove = 0;
// webgazerVideoContainer = document.getElementById("webgazerVideoContainer");
// webgazerVideoContainer.style.display = "none";

// create a div that has an image
const coverElement = document.createElement("div");
coverElement.setAttribute("id", "cover-element");
const dot = document.querySelector("#webgazerGazeDot");
// coverElement.style.background = "white";
// coverElement.backgroundImage = `url('./images/mike.png')`;

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
      webgazer.clearGazeListener();
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

//   const trackerTracker = new MutationObserver(updatePosition)
//   trackerTracker.observe(webGazerDot, {attributes: true})
