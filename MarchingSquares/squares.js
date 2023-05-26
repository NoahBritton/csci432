let res = 10;
let rows, cols;
let field;
let noise;
let increment = 0.1;
let zoff = 0;
let fillUp = false;

function setup() {
  createCanvas(1200, 800, Path2D);
  noise = new OpenSimplexNoise(Date.now());
  cols = 1 + width / res;
  rows = 1 + height / res;
  field = Array(cols)
    .fill()
    .map(() => Array(rows).fill());
}

function draw() {
  background(0);
  let xoff = 0;
  for (let i = 0; i < cols; i++) {
    let yoff = 0;
    for (let j = 0; j < rows; j++) {
      field[i][j] = noise.noise3D(xoff, yoff, zoff);
      yoff += increment;
    }
    xoff += increment;
  }
  zoff += 0.05;

  if (fillUp) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        fill(field[i][j] * 255);
        noStroke();
        rect(i * res, j * res, res, res);
      }
    }
  }

  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let x = i * res;
      let y = j * res;
      let a = createVector(x + res * 0.5, y);
      let b = createVector(x + res, y + res * 0.5);
      let c = createVector(x + res * 0.5, y + res);
      let d = createVector(x, y + res * 0.5);
      var state = getState(
        ceil(field[i][j]),
        ceil(field[i + 1][j]),
        ceil(field[i + 1][j + 1]),
        ceil(field[i][j + 1])
      );
      stroke(255);
      strokeWeight(1);
      switch (state) {
        case 1:
          drawLine(c, d);
          break;
        case 2:
          drawLine(b, c);
          break;
        case 3:
          drawLine(b, d);
          break;
        case 4:
          drawLine(a, b);
          break;
        case 5:
          drawLine(a, d);
          drawLine(b, c);
          break;
        case 6:
          drawLine(a, c);
          break;
        case 7:
          drawLine(a, d);
          break;
        case 8:
          drawLine(a, d);
          break;
        case 9:
          drawLine(a, c);
          break;
        case 10:
          drawLine(a, b);
          drawLine(c, d);
          break;
        case 11:
          drawLine(a, b);
          break;
        case 12:
          drawLine(b, d);
          break;
        case 13:
          drawLine(b, c);
          break;
        case 14:
          drawLine(c, d);
          break;
      }
    }
  }

  function drawLine(v1, v2) {
    line(v1.x, v1.y, v2.x, v2.y);
  }
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}

function keyPressed() {
    if (keyCode === 32) {
      fillUp = !fillUp;
    }
  }
  
