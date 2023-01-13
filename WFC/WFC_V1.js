const tiles = [];
let grid = [];

const DIM = 20;

const _BLANK = 0;
const _UP = 1;
const _RIGHT = 2;
const _DOWN = 3;
const _LEFT = 4;

const rules = [
  [
    [_BLANK, _UP],
    [_BLANK, _RIGHT],
    [_BLANK, _DOWN],
    [_BLANK, _LEFT],
  ],
  [
    [_RIGHT, _LEFT, _DOWN],
    [_LEFT, _UP, _DOWN],
    [_BLANK, _DOWN],
    [_RIGHT, _UP, _DOWN],
  ],
  [
    [_RIGHT, _LEFT, _DOWN],
    [_LEFT, _UP, _DOWN],
    [_RIGHT, _LEFT, _UP],
    [_BLANK, _LEFT],
  ],
  [
    [_BLANK, _UP],
    [_LEFT, _UP, _DOWN],
    [_RIGHT, _LEFT, _UP],
    [_RIGHT, _UP, _DOWN],
  ],
  [
    [_RIGHT, _LEFT, _DOWN],
    [_BLANK, _RIGHT],
    [_RIGHT, _LEFT, _UP],
    [_UP, _DOWN, _RIGHT],
  ],
];

function preload() {
  tiles[0] = loadImage("imgs/blank.png");
  tiles[1] = loadImage("imgs/up.png");
  tiles[2] = loadImage("imgs/right.png");
  tiles[3] = loadImage("imgs/down.png");
  tiles[4] = loadImage("imgs/left.png");
}

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [_BLANK, _UP, _RIGHT, _DOWN, _LEFT],
    };
  }
}

function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
}

function mousePressed() {
  redraw();
}

function draw() {
  background(0);

  const w = width / DIM;
  const h = height / DIM;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index], i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(100);
        rect(i * w, j * h, w, h);
      }
    }
  }

  let gridCopy = grid.slice();
  if (gridCopy.length == 0) {
    noLoop();
    return;
  }
  gridCopy = gridCopy.filter((a) => !a.collapsed);
  let min = Math.min(...gridCopy.map((tile) => tile.options.length));
  gridCopy = gridCopy.filter((tile) => tile.options.length === min);
  let cell = random(gridCopy);
  cell.collapsed = true;
  cell.options = [random(cell.options)];

  const nextGrid = [];
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = i + j * DIM;
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = [_BLANK, _UP, _RIGHT, _DOWN, _LEFT];
        let validOptions = [];
        // look up
        if (j > 0) {
          let up = grid[i + (j - 1) * DIM];
          for (let option of up.options) {
            let valid = rules[option][2];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        validOptions = [];
        // look right
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM];
          for (let option of right.options) {
            let valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        validOptions = [];
        // look down
        if (j < DIM - 1) {
          let down = grid[i + (j + 1) * DIM];
          for (let option of down.options) {
            let valid = rules[option][0];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        validOptions = [];
        // look left
        if (i > 0) {
          let left = grid[i - 1 + j * DIM];
          for (let option of left.options) {
            let valid = rules[option][1];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        nextGrid[index] = {
          options,
          collapsed: false,
        };
      }
    }
  }

  grid = nextGrid;
}
