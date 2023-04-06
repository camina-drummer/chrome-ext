const timeToStop = 10000;

// create a div that has an image
const coverElement = document.createElement('div');
coverElement.setAttribute('id', 'cover-element');
const dot = document.querySelector('#webgazerGazeDot');
coverElement.style.background = 'white'
coverElement.style.position = 'absolute';
coverElement.style.height = '100px'
coverElement.style.width = '100px'
document.querySelector('body').appendChild(coverElement);

let xprediction;
let yprediction;

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
    }

    coverElement.style.top = `${yprediction}px`
    coverElement.style.left = `${xprediction}px`

    console.log(xprediction, yprediction, elapsedTime); //elapsed time is based on time since begin was called
  })
  .begin();

//   function updatePosition() {
//     coverElement.style.top = `${yprediction}px`
//     coverElement.style.left = `${xprediction}px`
//   }

//   const trackerTracker = new MutationObserver(updatePosition)
//   trackerTracker.observe(webGazerDot, {attributes: true})
