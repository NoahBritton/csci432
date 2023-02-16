var dragging = false;
var empty = true;
var full = false;

// Circle variables for knob
var x = 575;
var y = 300;
var r = 100;
var kr = 20;
var x2 = x;
var y2 = y + r;

// Knob angle
var angle = 0;
var preAngle = 0;
var dx = 0;
var dy = 0;
var mouseAngle = 0;
var offsetAngle = 0;

// water level
var wl = 400;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);

  if (dragging) {
    updateKnob();
    dx = mouseX - x;
    dy = mouseY - y;
    // get angle of mouseXY
    mouseAngle = atan2(dy, dx);
    angle = mouseAngle - offsetAngle;
  }

  // Draw crank
  fill(255);
  push();
  translate(x, y);
  ellipse(0, 0, r * 2, r * 2); // circle
  pop();
  fill(0);
  ellipse(x2, y2, kr, kr); // knob
  // Draw water tank
  fill(255);
  rectMode(CORNERS);
  strokeWeight(0);
  fill(0, 0, 255);
  rect(150, 400, 250, wl); // water
  strokeWeight(1);
  rectMode(CORNER);
  fill("rgba(0,255,0, 0)");
  rect(150, 200, 100, 200); // tank
  fill(0);

  var status = full ? "Full!" : "";
  if (!full) {status = empty ? "Empty!" : "";}

  if (angle < preAngle) { //400
    if (!((wl + 0.5) > 400)) {
        wl += 0.5;
        empty = false;
    } else {
        empty = true;
    }
  } else if (angle > preAngle) { //200
    if (!((wl - 0.5) < 200)) {
        wl -= 0.5;
        full = false;
    } else {
        full = true;
    }
  }
  preAngle = angle;

  textAlign(CENTER);
  text(status, 200, 415);
}

function updateKnob() {
    // math for tracking pos of knob
    // (dx, dy): vector from "posA" to "posB"
    var dx1 = mouseX - x;
    var dy1 = mouseY - y;
    // dist : euclidean distance, length of the vecotr
    var distnc = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    // (ux, uy): unit vector form 'posA' in direction to 'posB', with length 1
    var ux = dx1 / distnc;
    var uy = dy1 / distnc;
    // (x2, y2): point with a distance of r from "posA" and the vector to "posB"
    x2 = x + ux * r;
    y2 = y + uy * r;
}

function mousePressed() {
  // Did I click on knob?
  if (dist(mouseX, mouseY, x2, y2) < kr) {
    dragging = true;
    // If so, start to keep track of relative location of mouseXY to corner of canvas
    var dx = mouseX - x;
    var dy = mouseY - y;
    offsetAngle = atan2(dy, dx) - angle;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}
