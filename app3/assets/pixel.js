class Pixel {
  constructor(x, y, i, j, resolution) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.resolution = resolution;
    this.value = 0;
    this.blocked = false;
  }

  show() {
    let offset = this.resolution / 2;
    let clicked = mouseIsPressed;
    if (window.drawingBoard[this.i][this.j].value == 1) {
      fill(255);
      stroke(0);
    } else {
      fill(69, 69, 69);
      stroke(0);
    }
    rect(this.x, this.y, this.resolution - 1, this.resolution - 1);
    if (
      clicked &&
      dist(this.x + offset, this.y + offset, mouseX, mouseY) < offset &&
      !window.drawingBoard[this.i][this.j].blocked
    ) {
      window.drawingBoard[this.i][this.j].blocked = true;
      if (window.drawingBoard[this.i][this.j].value == 1) {
        window.drawingBoard[this.i][this.j].value = 0;
      } else {
        window.drawingBoard[this.i][this.j].value = 1;
      }
    } else if (!clicked && window.drawingBoard[this.i][this.j].blocked) {
      window.drawingBoard[this.i][this.j].blocked = false;
    }
  }
}
