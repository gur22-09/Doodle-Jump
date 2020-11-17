// as we have added our script tag at bottom of the html we dont need to add a loading listener

// document.addEventListener("DOMContentLoaded", () => {

// });
const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
const scoreCard = document.querySelector(".score");
const newStart = document.createElement("button");
newStart.classList.add("start");
newStart.innerHTML = "Start Again?";
newStart.style.display = "None";
scoreCard.style.display = "None";
let doodlerLeftSpace = 50;
let startingPoint = 150;
let doodlerBottomSpace = startingPoint;
let isGameOver = false;
let platforms = [];
let platformCount = 5;
// change this to change moving speed
let moveInterval = 20;
let upTimerId;
let downTimerId;
let isJumping = true;
let isGoingLeft = false;
let isGoingRight = false;
let leftTimerId;
let rightTimerId;
let score = 0;

function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");
  doodlerLeftSpace = platforms[0].left;
  doodler.style.left = `${doodlerLeftSpace}px`;
  doodler.style.bottom = `${doodlerBottomSpace}px`;
}

class Platform {
  constructor(newPlatBottom) {
    this.bottom = newPlatBottom;
    this.left = 315 * Math.random(); // gridWidth - doodleWidth = 315
    this.visual = document.createElement("div");

    const visual = this.visual;
    visual.classList.add("platform");
    visual.style.left = `${this.left}px`;
    visual.style.bottom = `${this.bottom}px`;

    grid.appendChild(visual);
  }
}

function movePlatforms() {
  if (doodlerBottomSpace > 200) {
    platforms.forEach((platform) => {
      platform.bottom -= 4;
      const visual = platform.visual;
      visual.style.bottom = `${platform.bottom}px`;

      if (platform.bottom < 10) {
        const firstPlatform = platforms[0].visual;
        firstPlatform.classList.remove("platform");
        platforms.shift();
        // update Score
        score++;
        // now add a new platform
        const newPlatform = new Platform(600);
        platforms.push(newPlatform);
      }
    });
  }
}

function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let platGap = 600 / platformCount;
    let newPlatBottom = 100 + i * platGap;

    let newPlat = new Platform(newPlatBottom);
    platforms.push(newPlat);
  }
}

function jump() {
  clearInterval(downTimerId);
  isJumping = true;
  upTimerId = setInterval(function upTimerCallback() {
    doodlerBottomSpace += 20;
    doodler.style.bottom = `${doodlerBottomSpace}px`;

    if (doodlerBottomSpace > startingPoint + 200) {
      fall();
    }
  }, 30);
}

function fall() {
  clearInterval(upTimerId);
  isJumping = false;
  downTimerId = setInterval(function downTimerCallback() {
    doodlerBottomSpace -= 5;
    doodler.style.bottom = `${doodlerBottomSpace}px`;

    if (doodlerBottomSpace <= 0) {
      // set gameOver;
      gameOver();
    }
    platforms.forEach((platform) => {
      if (
        doodlerBottomSpace >= platform.bottom &&
        doodlerBottomSpace <= platform.bottom + 15 &&
        doodlerLeftSpace + 60 >= platform.left &&
        doodlerLeftSpace <= platform.left + 85 &&
        !isJumping
      ) {
        console.log("landed");
        startingPoint = doodlerBottomSpace;
        jump();
      }
    });
  }, 30);
}

function gameOver() {
  console.log("Game Over");
  isGameOver = true;
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  scoreCard.style.display = "block";
  scoreCard.innerHTML = `Score: ${score}`;
  newStart.style.display = "inline";
  grid.appendChild(newStart);
  newStart.onclick = function () {
    reset();

    start();
  };

  clearInterval(upTimerId);
  clearInterval(downTimerId);
  clearInterval(leftTimerId);
  clearInterval(rightTimerId);
}

function control(e) {
  if (e.key === "ArrowLeft") {
    // move left
    moveLeft();
  } else if (e.key === "ArrowRight") {
    // move right
    moveRight();
  } else if (e.key === "ArrowUp") {
    // be still
    moveStraight();
  }
}

function moveLeft() {
  if (isGoingRight) {
    clearInterval(rightTimerId);
    isGoingRight = false;
  }
  isGoingLeft = true;
  leftTimerId = setInterval(function leftTimerCallback() {
    if (doodlerLeftSpace >= 0) {
      doodlerLeftSpace -= 5;
      doodler.style.left = `${doodlerLeftSpace}px`;
    } else {
      moveRight();
    }
  }, moveInterval);
}

function moveRight() {
  if (isGoingLeft) {
    clearInterval(leftTimerId);
    isGoingLeft = false;
  }
  isGoingRight = true;
  rightTimerId = setInterval(function rightTimerCallback() {
    if (doodlerLeftSpace <= 340) {
      doodlerLeftSpace += 5;
      doodler.style.left = `${doodlerLeftSpace}px`;
    } else {
      moveLeft();
    }
  }, moveInterval);
}

function moveStraight() {
  isGoingRight = false;
  isGoingLeft = false;
  clearInterval(leftTimerId);
  clearInterval(rightTimerId);
}

function start() {
  if (!isGameOver) {
    createPlatforms();
    createDoodler();
    setInterval(movePlatforms, 30);
    jump();

    document.addEventListener("keyup", control);
  }
}

function reset() {
  newStart.style.display = "None";
  scoreCard.style.display = "None";
  platforms = [];
  doodlerLeftSpace = 50;
  startingPoint = 150;
  doodlerBottomSpace = startingPoint;
  isGameOver = false;
  platformCount = 5;
  moveInterval = 20;
  isJumping = true;
  isGoingLeft = false;
  isGoingRight = false;
  score = 0;
}

start();
console.log(platforms);
