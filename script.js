// Select DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore'); // New: High score display

// Game variables
let snake = [{ x: 200, y: 200 }]; // Initial snake position
let food = { x: 0, y: 0 }; // Food position
let dx = 10; // Horizontal velocity
let dy = 0; // Vertical velocity
let score = 0;
let isGameRunning = false;
let gameInterval;

// High score tracking
let highScore = localStorage.getItem('highScore') || 0; // Retrieve high score from localStorage
highScoreDisplay.textContent = highScore; // Display the high score

// Set canvas dimensions dynamically
function setCanvasSize() {
  canvas.width = Math.min(400, window.innerWidth - 40); // Responsive width
  canvas.height = Math.min(400, window.innerHeight - 150); // Responsive height
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Initialize Particles.js
particlesJS.load('particles-js', 'particles.json', function () {
  console.log('Particles.js loaded');
});

// Generate random food position
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = '#00ff00'; // Neon green for the snake
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
}

// Draw the food
function drawFood() {
  ctx.fillStyle = '#ff0000'; // Red for the food
  ctx.fillRect(food.x, food.y, 10, 10);
}

// Update the game state
function updateGame() {
  // Move the snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;

    // Update high score if current score is higher
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
      localStorage.setItem('highScore', highScore); // Save high score to localStorage
    }

    generateFood();
  } else {
    snake.pop(); // Remove the tail if no food is eaten
  }

  // Check for collisions (walls or self)
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver();
  }
}

// Clear the canvas and redraw everything
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
}

// Game loop
function gameLoop() {
  updateGame();
  drawGame();
}

function startGame() {
  console.log("Start Game button clicked!"); // Debugging log
  if (!isGameRunning) {
    isGameRunning = true;
    generateFood();
    gameInterval = setInterval(gameLoop, 100);
  }
}

// Pause the game
function pauseGame() {
  if (isGameRunning) {
    isGameRunning = false;
    clearInterval(gameInterval);
  }
}

// Reset the game
function resetGame() {
  pauseGame();
  snake = [{ x: 200, y: 200 }];
  dx = 10;
  dy = 0;
  score = 0;
  scoreDisplay.textContent = score;
  isGameRunning = false;
}

// Handle keyboard input
function handleKeyPress(event) {
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === 37 && !goingRight) {
    dx = -10;
    dy = 0;
  } // Left arrow key
  if (keyPressed === 38 && !goingDown) {
    dx = 0;
    dy = -10;
  } // Up arrow key
  if (keyPressed === 39 && !goingLeft) {
    dx = 10;
    dy = 0;
  } // Right arrow key
  if (keyPressed === 40 && !goingUp) {
    dx = 0;
    dy = 10;
  } // Down arrow key
}

// Game over logic
function gameOver() {
  pauseGame();
  alert('Game Over! Your score: ' + score);
  resetGame();
}

// Event listeners
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
resetButton.addEventListener('click', resetGame);
document.addEventListener('keydown', handleKeyPress);

// Initialize the game
resetGame();