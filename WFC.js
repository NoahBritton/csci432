const tiles = [];
let grid = [];

const DIM = 2;

const _BLANK = 0;
const _UP = 1;
const _DOWN = 2;
const _LEFT = 3;
const _RIGHT = 4;

function preload() {
  tiles[0] = loadImage("imgs/blank.png");
  tiles[1] = loadImage("imgs/up.png");
  tiles[2] = loadImage("imgs/down.png");
  tiles[3] = loadImage("imgs/left.png");
  tiles[4] = loadImage("imgs/right.png");
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [_BLANK, _UP, _DOWN, _LEFT, _RIGHT],
    };
  }
  grid[0].collapsed = true;
  grid[0].options = [_UP];
}

function collapse() {
  const w = width / DIM;
  const h = height / DIM;
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index], j * w, i * h);
      } else {
        fill(0);
        stroke(255);
        rect(j * w, j * h, w, h);
      }
    }
  }
}

function updateEntropy() {
    const gridCopy = grid.slice();
    gridCopy.sort((a, b) => {
        return a.options.length - b.options.length;
    });

}

function draw() {
  background(0);
  collapse();
}
