// Set up canvas and game variables
let width = 1500;
let height = 800;
// let startX = 50;
// let startY = 420;
let playerX = 50;
let playerY = 420;
let playerWidth = 20;
let playerHeight = 20;
let playerSpeed = 7;
let playerJumpHeight = 5;
let gravity = 5;
let jumpGravity = 0.1;
let isJumping = false;
let jumpFrames = 0;
let jumpLim = 2;

let projectileSpeed = 10;
let projectiles = [];

let enemySize = 30;
let enemyKilled = false;

let platforms = [
  // Floor platform
  { x: 0, y: height - 20, width: width, height: 20 },
  // Other platforms
  { x: 50, y: 500, width: 150, height: 20 },
  { x: 650, y: 400, width: 150, height: 20 },
  { x: 600, y: 500, width: 150, height: 20 },
  { x: 1000, y: 200, width: 300, height: 20 },
];

let walls = [
  { x: 0, y: 0, width: 20, height: height },
  { x: width - 20, y: 0, width: 20, height: height },
];

let ceilings = [
  // Ceiling platform
  { x: 0, y: 0, width: width, height: 20 },
  // Example fallthrough platform
  { x: 825, y: 600, width: 150, height: 20 },
];

let jumpWalls = [
  { x: 250, y: 250, width: 20, height: 150 },
  { x: 250, y: 600, width: 20, height: 150 },
  { x: 600, y: 250, width: 20, height: 150 },
  { x: 600, y: 50, width: 20, height: 150 },
  { x: 600, y: 600, width: 20, height: 150 },
  { x: 800, y: 600, width: 20, height: 150 },
  { x: 800, y: 450, width: 20, height: 150 },
  { x: width - 21, y: 0, width: 20, height: height },
];

let enemies = [new Enemy(1000, 170, 30)];

function setup() {
  createCanvas(width, height);
}

function draw() {
  // Set background color
  background(225);
  fill("red");
  // Draw the enemies
  if (!enemyKilled) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].draw();
    }
  }
  fill(225);

  // Apply gravity to player
  playerY += gravity;

  // Draw platforms
  for (let i = 0; i < platforms.length; i++) {
    let platform = platforms[i];
    rect(platform.x, platform.y, platform.width, platform.height);

    // Check for collision with platform
    if (
      playerY + playerHeight >= platform.y &&
      playerY + playerHeight <= platform.y + platform.height &&
      playerX + playerWidth >= platform.x &&
      playerX <= platform.x + platform.width
    ) {
      playerY = platform.y - playerHeight;
      jumpFrames = 0;
      playerJumpHeight = 0;
      isJumping = false;
    }
  }
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    rect(wall.x, wall.y, wall.width, wall.height);

    if (
      playerY + playerHeight >= wall.y &&
      playerY + playerHeight <= wall.y + wall.height &&
      playerX + playerWidth >= wall.x &&
      playerX <= wall.x + wall.width
    ) {
      // Determine which direction the player is coming from
      let comingFromLeft = playerX + playerWidth <= wall.x + wall.width / 2;
      let comingFromRight = playerX >= wall.x + wall.width / 2;

      if (comingFromLeft) {
        // Player is coming from the left
        playerX = wall.x - playerWidth;
      } else if (comingFromRight) {
        // Player is coming from the right
        playerX = wall.x + wall.width;
      }
    }

    for (let i = 0; i < ceilings.length; i++) {
      let ceiling = ceilings[i];
      rect(ceiling.x, ceiling.y, ceiling.width, ceiling.height);

      if (
        playerY <= ceiling.y + ceiling.height &&
        playerY >= ceiling.y &&
        playerX + playerWidth >= ceiling.x &&
        playerX <= ceiling.x + ceiling.width
      ) {
        playerY = ceiling.y + ceiling.height;
      }
    }

    // Draw jumpWalls
    for (let i = 0; i < jumpWalls.length; i++) {
      let jumpWall = jumpWalls[i];

      let gradient = drawingContext.createLinearGradient(
        0,
        jumpWall.y,
        0,
        jumpWall.y + jumpWall.height
      );
      gradient.addColorStop(0, "#00ff00");
      gradient.addColorStop(1, "#ffff00");

      // Set the fill color and draw the jumpWall
      drawingContext.fillStyle = gradient;
      beginShape();
      rect(jumpWall.x, jumpWall.y, jumpWall.width, jumpWall.height);
      endShape(CLOSE);

      // Reset fill color to default for non-jump wall rectangles
      drawingContext.fillStyle = fill("white");

      if (
        playerY + playerHeight >= jumpWall.y &&
        playerY + playerHeight <= jumpWall.y + jumpWall.height &&
        playerX + playerWidth >= jumpWall.x &&
        playerX <= jumpWall.x + jumpWall.width
      ) {
        // Determine which direction the player is coming from
        let comingFromLeft =
          playerX + playerWidth <= jumpWall.x + jumpWall.width / 2;
        let comingFromRight = playerX >= jumpWall.x + jumpWall.width / 2;

        if (comingFromLeft) {
          // Player is coming from the left
          playerX = jumpWall.x - playerWidth;
        } else if (comingFromRight) {
          // Player is coming from the right
          playerX = jumpWall.x + jumpWall.width;
        }
        jumpFrames = 0;
        playerJumpHeight = 0;
        isJumping = false;
      }
    }
  }

  // Draw player
  rect(playerX, playerY, playerWidth, playerHeight);

  // update and draw the projectiles
  for (let i = 0; i < projectiles.length; i++) {
    let proj = projectiles[i];
    proj.x += proj.dx;
    proj.y += proj.dy;
    ellipse(proj.x, proj.y, 10);

    // check for collision with enemy block
    if (
      proj.x > enemies[0].x &&
      proj.x < enemies[0].x + enemySize &&
      proj.y > enemies[0].y &&
      proj.y < enemies[0].y + enemySize &&
      !enemyKilled
    ) {
      // remove projectile and kill enemy
      projectiles.splice(i, 1);
      enemyKilled = true;
    }
  }

  // remove projectiles that go off-screen
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let proj = projectiles[i];
    if (proj.x < 0 || proj.x > width || proj.y < 0 || proj.y > height) {
      projectiles.splice(i, 1);
    }
  }

  // Move player left or right
  if (keyIsDown(65)) {
    // A key
    playerX -= playerSpeed;
  } else if (keyIsDown(68)) {
    // D key
    playerX += playerSpeed;
  }

  // Make player jump
  if (keyIsDown(32) && jumpFrames <= jumpLim) {
    // Spacebar
    isJumping = true;
    jumpFrames++;
    playerJumpHeight = 25;
  }

  if (isJumping) {
    playerY -= playerJumpHeight;
    playerJumpHeight -= jumpGravity * playerJumpHeight; // Adjust the jump gravity based on the jump height
    if (playerJumpHeight <= 0) {
      isJumping = false;
      gravity = 5; // Set the gravity value back to the default value when the player is falling
    }
  } else {
    playerY += gravity * playerJumpHeight; // Add the gravity effect to the player's Y position
  }
}

function mouseClicked() {
  let mouseDist = dist(playerX, playerY, mouseX, mouseY);
  if (mouseDist > playerHeight / 2) {
    // add a new projectile towards the mouse pointer
    let angle = atan2(mouseY - playerY, mouseX - playerX);
    let dx = projectileSpeed * cos(angle);
    let dy = projectileSpeed * sin(angle);
    projectiles.push({ x: playerX, y: playerY, dx: dx, dy: dy });
  }
}
