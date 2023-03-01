// Game constants
const BALL_RADIUS = 10;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 75;
const PADDLE_OFFSET = 30;
const BALL_SPEED = 5;
const PADDLE_SPEED = 5;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

// Game variables
let ballX = CANVAS_WIDTH / 2;
let ballY = CANVAS_HEIGHT / 2;
let ballDX = BALL_SPEED;
let ballDY = BALL_SPEED;
let player1Y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
let player2Y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;

// Get canvas element
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

// Game loop
function gameLoop() {
  // Clear canvas
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw ball
  context.beginPath();
  context.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
  context.fillStyle = "black";
  context.fill();

  // Draw player 1 paddle
  context.fillRect(PADDLE_OFFSET, player1Y, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Draw player 2 paddle
  context.fillRect(
    CANVAS_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH,
    player2Y,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );

  // Move ball
  ballX += ballDX;
  ballY += ballDY;

  // Check for collision with top/bottom walls
  if (ballY < BALL_RADIUS || ballY > CANVAS_HEIGHT - BALL_RADIUS) {
    ballDY = -ballDY;
  }

  // Check for collision with player 1 paddle
  if (
    ballX < PADDLE_OFFSET + BALL_RADIUS &&
    ballY > player1Y &&
    ballY < player1Y + PADDLE_HEIGHT
  ) {
    ballDX = -ballDX;
  }

  // Check for collision with player 2 paddle
  if (
    ballX > CANVAS_WIDTH - PADDLE_OFFSET - BALL_RADIUS - PADDLE_WIDTH &&
    ballY > player2Y &&
    ballY < player2Y + PADDLE_HEIGHT
  ) {
    ballDX = -ballDX;
  }

  // Move player 1 paddle
  if (keyIsDown("w") && player1Y > 0) {
    player1Y -= PADDLE_SPEED;
  }
  if (keyIsDown("s") && player1Y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
    player1Y += PADDLE_SPEED;
  }

  // Move player 2 paddle
  if (ballY < player2Y + PADDLE_HEIGHT / 2 && player2Y > 0) {
    player2Y -= PADDLE_SPEED;
  }
  if (
    ballY > player2Y + PADDLE_HEIGHT / 2 &&
    player2Y < CANVAS_HEIGHT - PADDLE_HEIGHT
  ) {
    player2Y += PADDLE_SPEED;
  }

  // Check if ball has gone out of bounds
  if (ballX < -BALL_RADIUS || ballX > CANVAS_WIDTH + BALL_RADIUS) {
    ballX = CANVAS_WIDTH / 2;
    ballY = CANVAS_HEIGHT / 2;
    ballDX = BALL_SPEED;
    ballDY = BALL_SPEED;
  }

  // Check if player 1 has won
  if (ballX < 0) {
    alert("Player 2 wins!");
    location.reload();
  }

  // Check if player 2 has won
  if (ballX > CANVAS_WIDTH) {
    alert("Player 1 wins!");
    location.reload();
  }

  // Request animation frame
  window.requestAnimationFrame(gameLoop);
}
// Handle key events
const keys = {};
function keyIsDown(keyCode) {
  return keys[keyCode];
}

document.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

// Start game loop
gameLoop();
