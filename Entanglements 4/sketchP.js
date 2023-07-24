var inc = 1; //0.5
var scl = 100; //75
var cols, rows;
var fr;
var zoff = 0;
var particles = [];
var particles2 = [];
var flowfield;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas2");
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  //fr = createP("");
  flowfield = new Array(cols * rows);
  for (i = 0; i < 125; i++) {
    //particles[i] = new Particle(3, 0 + i * 20, 0);
    particles[i] = new Particle(
      random(3),
      random(35, windowWidth - 35),
      random(35, windowHeight - 35),
      random(0, 230)
    );
  }

  background(29);
  rectMode(RADIUS);
  fill(255);
  //fill(alpha(50));
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
}

function draw() {
  // background(255);
  var yoff = 0.1;
  xL = 0.1;
  yL = 1;
  for (var y = 0; y < rows; y++) {
    var xoff = 0.1;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      flowfield[index] = v;
      xL = map(xLocator, 0, windowWidth, 0, 1) * 10;
      yL = map(yLocator, 0, windowHeight, 0, 1);
      //console.log(xLocator);
      //var angle = noise(xoff, yoff, zoff) * 10;
      var angle1 = noise(xoff, yoff, zoff) * xL;
      var v = p5.Vector.fromAngle(angle1);
      //var angle = xL;
      // var v = p5.Vector.fromAngle(angle);
      v.setMag(yL);
      xoff += inc;
      // stroke(0, 100);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop(); //fill(r);
    }
    yoff += inc;
    zoff += 0.00008;
    //console.log(xL);
    //console.log(yL);
  }
  // push();
  // fill(255);
  // rect(
  //   windowWidth / 2,
  //   windowHeight / 2,
  //   windowWidth / 2 - 30,
  //   windowHeight / 2 - 30
  // );
  // pop();

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
    //particles[i].tentacle();
  }
  push();
  fill(255, 1 * sin(millis() * 100000));

  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  pop();

  //fr.html(floor(frameRate()));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  myp5.resizeCanvas(windowWidth, windowHeight);
  background(29);
  fill(255);
  //fill(alpha(50));
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  //fr = createP("");
  flowfield = new Array(cols * rows);

  if (windowWidth > 1400) {
    numberPar = 150;
  } else {
    numberPar = 150;
  }
  for (i = 0; i < numberPar; i++) {
    //particles[i] = new Particle(3, 0 + i * 20, 0);
    particles[i] = new Particle(
      random(3),
      random(35, windowWidth - 35),
      random(35, windowHeight - 35),
      random(0, 230)
    );
  }
}
function mousePressed() {
  windowResized();
}
