class Enemy {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }
}
