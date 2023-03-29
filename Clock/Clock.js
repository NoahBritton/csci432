function setup() {
  createCanvas(600, 700);
  angleMode(DEGREES);
}

function draw() {
  translate(width / 2, height / 2);
  rotate(-90);

  let hr = hour() % 12;
  let min = minute();
  let sec = second();

  strokeWeight(8);
  noFill();

  // Draw hour hand
  stroke(150, 100, 255);
  let hrAngle = map(hr, 0, 12, 0, 360);
  arc(0, 0, 460, 460, 0, hrAngle);
  push();
  rotate(hrAngle);
  stroke(150, 100, 255);
  line(0, 0, 75, 0);
  strokeWeight(1);
  textSize(24);
  textAlign(CENTER, TOP);
  text(hr, 75, 30);
  pop();

  // Draw minute hand
  stroke(255, 100, 100);
  let minAngle = map(min, 0, 60, 0, 360);
  arc(0, 0, 480, 480, 0, minAngle);
  push();
  rotate(minAngle);
  stroke(255, 100, 100);
  line(0, 0, 100, 0);
  strokeWeight(1);
  textSize(24);
  textAlign(CENTER, TOP);
  text(min, 100, 30);
  pop();

  // Draw second hand
  stroke(100, 150, 255);
  let secAngle = map(sec, 0, 60, 0, 360);
  arc(0, 0, 500, 500, 0, secAngle);
  push();
  rotate(secAngle);
  stroke(100, 150, 255);
  line(0, 0, 125, 0);
  strokeWeight(1);
  textSize(24);
  textAlign(CENTER, TOP);
  text(sec, 125, 30);
  pop();


  // Draw digital time
  push();
  rotate(90);
  strokeWeight(1);
  textSize(36);
  textAlign(CENTER, TOP);
  text(`${nf(hr, 2)}:${nf(min, 2)}:${nf(sec, 2)}`, 0, 270);
  pop();
}
