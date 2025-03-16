const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');  // Get the score element
// Set up the game variables
const box = 20;  // Size of each square
const canvasSize = 400;
let snake = [{ x: box * 5, y: box * 5 }];
let direction = { x: 0, y: 0 };
let food = { x: getRandomInt(0, canvasSize / box) * box, y: getRandomInt(0, canvasSize / box) * box };
let score = 0;
// Handle keyboard input
document.addEventListener('keydown', changeDirection);
// Main game loop
function gameLoop() {
  if (gameOver()) {
    alert('Oops!! Game Over... Your Score: ' + score);
    document.location.reload();
    return;
  }
  clearCanvas();
  drawFood();
  moveSnake();
  drawSnake();
  if (snakeEatsFood()) {
    score += 10;
    scoreDisplay.textContent = score;  // Update the score display
    growSnake();
    food = { x: getRandomInt(0, canvasSize / box) * box, y: getRandomInt(0, canvasSize / box) * box };
  }
  setTimeout(gameLoop, 100);
}
// Start the game
gameLoop();
// Functions
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, box, box);
  });
}
function moveSnake() {
  const head = { x: snake[0].x + direction.x * box, y: snake[0].y + direction.y * box };
  snake.unshift(head);
  snake.pop();
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  if (keyPressed === 37 && direction.x === 0) { // Left arrow
    direction = { x: -1, y: 0 };
  } else if (keyPressed === 38 && direction.y === 0) { // Up arrow
    direction = { x: 0, y: -1 };
  } else if (keyPressed === 39 && direction.x === 0) { // Right arrow
    direction = { x: 1, y: 0 };
  } else if (keyPressed === 40 && direction.y === 0) { // Down arrow
    direction = { x: 0, y: 1 };
  }
}
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);
}
function snakeEatsFood() {
  return snake[0].x === food.x && snake[0].y === food.y;
}
function growSnake() {
  snake.push({});  // Add an extra part to the snake
}
function gameOver() {
  // Check if the snake hits the wall
  if (snake[0].x < 0 || snake[0].x >= canvasSize || snake[0].y < 0 || snake[0].y >= canvasSize) {
    return true;
  }
  // Check if the snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}