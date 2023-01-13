function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
let run = false;
let startup = true;
let board;
let cols;
let rows;
let resolution = 10;

function setup() {
  createCanvas(600, 400 * 2);
  cols = width / resolution;
  rows = height / resolution / 2;

  board = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }

  window.drawingBoard = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      window.drawingBoard[i][j] = new Pixel(x, y, i, j, resolution);
    }
  }

  let runButton;
  runButton = createButton("run");
  runButton.position(runButton.width + 10, 0, 'relative');
  runButton.mousePressed(() => gameButton(runButton));
  runButton.parent('buttons');
  let clearButton;
  clearButton = createButton("clear");
  clearButton.position(width + runButton.width + 10, 0, 'relative');
  clearButton.mousePressed(() => clearGame());
  clearButton.parent('buttons');
}

function draw() {
  background(0);

  // create drawing board
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      window.drawingBoard[i][j].show();
    }
  }

  // create game board
  if (run) {
    runGame();
  } else {
    frameRate(60);
    startup = true;
  }
}

function gameButton(element) {
  run = !run;
  inner = element.html();
  inner = inner == "run" ? "stop" : "run";
  element.html(inner);
}

function clearGame() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      window.drawingBoard[i][j].value = 0;
    }
  }
}

function runGame() {
  if (startup) {
    frameRate(5);
    startup = false;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        board[i][j] = window.drawingBoard[i][j].value;
      }
    }
  }
  let next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (board[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y + height / 2, resolution - 1, resolution - 1);
      } else {
        fill(69, 69, 69);
        stroke(0);
        rect(x, y + height / 2, resolution - 1, resolution - 1);
      }
    }
  }

  // compute next state
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = board[i][j];
      // count live neighbors of current index
      let neighbors = liveCount(board, i, j);
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3 || neighbors == 8)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  board = next;
}

function liveCount(board, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += board[col][row];
    }
  }
  sum -= board[x][y];
  return sum;
}
