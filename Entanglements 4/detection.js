let detections = {};

const videoElement = document.getElementById("video");

let hands = new Hands({
  locateFile: (file) => {
    return `libraries/hands/${file}`;
  },
});

hands.setOptions({
  maxNumHands: 1,
  minDetectionConfidence: 0.4,
  minTrackingConfidence: 0.5,
});

hands.onResults(gotHands);

function gotHands(results) {
  detections = results;
  //console.log(detections);
}

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 360,
  height: 360,
  // width: windowWidth,
  // height: windowHeight,
});
camera.start();
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}
