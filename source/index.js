const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const score = document.getElementById("score");

const keyboardInput = new Input();

const config = {
  step: 0,
  passStep: 3,
  sizeCell: 16,
  sizePoint: 16 / 4,
  gamePoints: 0,
};

const snake = {
  x: canvas.clientWidth / 2,
  y: canvas.clientHeight / 2,
  maxTails: 1,
  tails: [],
  speed: 8,
};

const point = {
  x: 0,
  y: 0,
};

update();
getRandomPointPosition();

function update() {
  requestAnimationFrame(update);
  if (++config.step < config.passStep) {
    return;
  }
  config.step = 0;

  context.clearRect(0, 0, canvas.width, canvas.height);

  drawPoint();
  snakeMove();
}

function snakeMove() {
  snake.x += keyboardInput.getDirectionX() * snake.speed;
  snake.y += keyboardInput.getDirectionY() * snake.speed;

  addTails();
  collisionBorder();

  checkCollisionWithTail();
  checkCollisionWithPoint();
}

function addTails() {
  snake.tails.unshift({
    x: snake.x,
    y: snake.y,
  });

  if (snake.tails.length > snake.maxTails) {
    snake.tails.pop();
  }

  drawSnake();
}

function drawSnake() {
  snake.tails.map((item, index) => {
    index === 0
      ? (context.fillStyle = "#000")
      : (context.fillStyle = "#E1F2F4");

    context.fillRect(item.x, item.y, config.sizeCell, config.sizeCell);
    context.stroke();
  });
}

function checkCollisionWithTail() {
  for (let i = 1; i < snake.tails.length; i++) {
    for (let j = 0; j < snake.tails.length; j++) {
      if (
        snake.tails[i].x == snake.tails[j].x &&
        snake.tails[i].y == snake.tails[j].y
      ) {
        if (i !== j) {
          restartGame();
          return;
        }
      }
    }
  }
}

function restartGame() {
  config.gamePoints = 0;
  drawScore();

  snake.tails = [];
  snake.maxTails = 1;

  getRandomPointPosition();

  return;
}

function checkCollisionWithPoint() {
  let strokeWidth = 10;

  const pointCollider = {
    width: point.x + config.sizePoint + strokeWidth,
    height: point.y + config.sizePoint + strokeWidth,
  };

  snake.tails.map((tail) => {
    const tailCollider = {
      width: tail.x + config.sizeCell + strokeWidth,
      height: tail.y + config.sizeCell + strokeWidth,
    };

    if (
      pointCollider.width > tail.x &&
      point.x < tailCollider.width &&
      pointCollider.height > tail.y &&
      point.y < tailCollider.height
    ) {
      snake.maxTails++;
      incrementGamePoint();
      getRandomPointPosition();
    }
  });
}

function getRandomPointPosition() {
  let padding = 14;
  point.x = getRandomPosition(0, canvas.width / config.sizeCell) * padding;
  point.y = getRandomPosition(0, canvas.height / config.sizeCell) * padding;
}

function drawPoint() {
  context.beginPath();
  context.strokeStyle = "#27D3E7";
  context.fillStyle = "#0000FF";
  context.arc(
    point.x + config.sizeCell / 2,
    point.y + config.sizeCell / 2,
    config.sizePoint,
    0,
    2 * Math.PI
  );
  context.fill();
}

function getRandomPosition(min, max) {
  return Math.random() * (max - min) + min;
}

function incrementGamePoint() {
  config.gamePoints++;
  drawScore();
}

function drawScore() {
  score.innerHTML = config.gamePoints;
}

function collisionBorder() {
  if (snake.x < 0) {
    snake.x = canvas.clientWidth;
  } else if (snake.x > canvas.clientWidth) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.clientHeight;
  } else if (snake.y > canvas.clientHeight) {
    snake.y = 0;
  }
}
