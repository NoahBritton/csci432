class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(6, 8));
    this.acc = createVector();
    this.maxForce = 1;
    this.maxSpeed = 4;
  }

  edges() {
    if (this.pos.x > width) {
        this.pos.x = 0;
    } else  if (this.pos.x < 0){
        this.pos.x = width;
    }
    if (this.pos.y > height) {
        this.pos.y = 0;
    } else  if (this.pos.y < 0){
        this.pos.y = height;
    }
  }

  align(boids) {
    let total = 0;
    let perception = 75;
    let steering = createVector();
    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perception) {
        steering.add(other.vel);
        total++;
      }
    }
    if(total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed)
        steering.sub(this.vel);
        steering.limit(this.maxForce)
    }
    return steering;
  }

  cohesion(boids) {
    let total = 0;
    let perception = 75;
    let steering = createVector();
    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perception) {
        steering.add(other.pos);
        total++;
      }
    }
    if(total > 0) {
        steering.div(total);
        steering.sub(this.pos)
        steering.setMag(this.maxSpeed)
        steering.sub(this.vel);
        steering.limit(this.maxForce)
    }
    return steering;
  }

  seperation(boids) {
    let total = 0;
    let perception = 75;
    let steering = createVector();
    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perception) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if(total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed)
        steering.sub(this.vel);
        steering.limit(this.maxForce)
    }
    return steering;
  }

  flock(boids) {
    this.acc.mult(0)
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let seperation = this.seperation(boids);

    alignment.mult(alignmentSlider.value());
    cohesion.mult(cohesionSlider.value());
    seperation.mult(seperationSlider.value());

    this.acc.add(alignment);
    this.acc.add(cohesion);
    this.acc.add(seperation);
  }

  update() {
    this.edges()
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
  }

  show() {
    strokeWeight(8);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
}
