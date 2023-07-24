function Particle(radius, xloc, yloc, alphas) {
  this.xLoc = xloc;
  this.yLoc = yloc;
  this.alpha = alphas;
  this.pos = createVector(this.xLoc, this.yLoc);
  //this.pos = createVector(windowWidth / 2, 0);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 4;
  this.prevPos = this.pos.copy();
  this.r = radius;

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.show = function () {
    stroke(0, this.alpha);
    strokeWeight(3);
    //stroke(60, 200, 100, 100);
    //line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    // fill(150, 50, 123, 45);
    rect(this.pos.x, this.pos.y, this.r, this.r);

    //point(this.pos.x, this.pos.y);
    this.updatePrev();
  };
  this.updatePrev = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };
  this.edges = function () {
    if (this.pos.x > windowWidth - 50) {
      this.pos.x = 50;
      this.updatePrev();
    }
    if (this.pos.x < 50) {
      this.pos.x = windowWidth - 50;
      this.updatePrev();
    }
    if (this.pos.y > windowHeight - 50) {
      this.pos.y = 50;
      this.updatePrev();
    }
    if (this.pos.y < 50) {
      this.pos.y = windowHeight - 50;
      this.updatePrev();
    }
  };
  this.follow = function (vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  };
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
