const flock = [];

let alignmentSlider, cohesionSlider, seperationSlider;

function setup() {
    createCanvas(640, 360);
    alignmentSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    seperationSlider = createSlider(0, 5, 1, 0.1);

    alignmentSlider.style('position', 'relative');
    cohesionSlider.style('position', 'relative');
    seperationSlider.style('position', 'relative');

    alignmentSlider.position(0, -85, 'relative');
    cohesionSlider.position(-133, alignmentSlider.y + 35, 'relative');
    seperationSlider.position(-266, cohesionSlider.y + 35, 'relative');

    alignmentSlider.parent('sliders');
    cohesionSlider.parent('sliders');
    seperationSlider.parent('sliders');

    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(51);

textSize(32);

    for (let boid of flock) {
        boid.flock(flock)
        boid.show();
        boid.update();
    }
}
