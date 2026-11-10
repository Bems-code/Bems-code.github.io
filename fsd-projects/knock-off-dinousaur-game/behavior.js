let code = "done";
let bugs = "none";
let money = `ton`;

const bg = document.querySelector(".bg");
const char = document.querySelector(".char");
const obstacle = document.querySelector(".reset");
const decor = document.querySelector(".decor");
const gameData = document.querySelector(".game-data p");
const board = document.querySelector(".board");
const canvas = board.querySelector("canvas");
const rect = board.getBoundingClientRect();
const ctx = canvas.getContext("2d");

const absWidth = rect.width;
const absHeight = rect.height;
const halfWidth = absWidth / 2;
const halfHeight = absHeight / 2;
canvas.width = absWidth;
canvas.height = absHeight;
console.log(absWidth, absHeight);

const jumpPower = 23;
const gravity = 0.982; // earth
const floor = absHeight - 125;

let x = absWidth;
const step = 6;

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// credit to @Bems-code for the collision code
class box {
  constructor(Params) {
    this.height = Params.height;
    this.width = Params.width;

    this.pos = Params.pos;
    this.velo = Params.velo;
    this.accel = Params.accel;

    this.img = Params.img;
  }

  get bottom() {
    return this.pos[1] + this.height / 2;
  }
  get top() {
    return this.pos[1] - this.height / 2;
  }
  get left() {
    return this.pos[0] - this.width / 2;
  }
  get right() {
    return this.pos[0] + this.width / 2;
  }

  draw() {
    ctx.drawImage(this.img, this.left, this.top, this.width, this.height);
  }

  stepMovement() {
    this.velo[0] += this.accel[0];
    this.velo[1] += this.accel[1];

    this.pos[0] += this.velo[0];
    this.pos[1] += this.velo[1];

    if (this.left <= 0) {
      this.velo[0] *= -1;
      this.pos[0] -= this.left;
    } else if (this.right >= absWidth) {
      this.velo[0] *= -1;
      this.pos[0] += absWidth - this.right;
    }

    if (this.bottom >= floor) {
      this.velo[1] = 0;
      this.pos[1] = floor - this.height / 2;
    } else if (this.top <= 0) {
      this.velo[1] *= -1;
      this.pos[1] = this.height / 2;
    }
  }
}

// They're all boxes?? || yuh
// Also these apply to birds
class spike extends box {
  // add health logic later if time allows
  constructor(Params) {
    super(Params);
  }

  stepMovement() {
    this.velo[0] += this.accel[0];
    this.velo[1] += this.accel[1];

    this.pos[0] += this.velo[0];
    this.pos[1] += this.velo[1];

    if (this.right <= -this.width) {
      this.pos[0] = absWidth + this.width;
    }

    if (this.bottom >= floor) {
      this.velo[1] = 0;
      this.pos[1] = floor - this.height / 2;
    } else if (this.top <= 0) {
      this.velo[1] *= -1;
      this.pos[1] = this.height / 2;
    }
  }
}

class params {
  /**
   * @param   {string} img
   * @param   {number} width
   * @param   {number} height
   * @param   {[number, number]} pos
   * @param   {[number, number]} velo
   * @param   {[number, number]} accel
   */ // Not needed, will default if not specified || also sucks since it requries specific order, so do it outside of this
  constructor(img, width, height, pos, velo, accel) {
    this.img = img
      ? img
      : `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg0`;

    this.width = width ? width : 25;
    this.height = height ? height : 25;

    this.pos = pos ? pos : [0, 0];
    this.velo = velo ? velo : [0, 0];
    this.accel = accel ? accel : [0, 0];
  }
}
// credits end here, rest of it is my own

function bgRoll() {
  x -= step;
  ctx.drawImage(bg, x, 0, absWidth, absHeight);

  ctx.save(); // Save the current state
  ctx.scale(-1, 1); // Set scale to flip the image
  ctx.drawImage(bg, -x, 0, absWidth, absHeight);
  ctx.drawImage(bg, -x - absWidth * 2, 0, absWidth, absHeight);
  ctx.restore(); // Restore the last saved state

  if (x <= -absWidth) {
    x = absWidth;
  }
}

//WE'RE GONNA USE CIRCLES FOR THIS SINCE ITS EASIER
// BOXES USE TOO MANY IF STATEMENTS
const plrParams = new params(
  char,
  90,
  90,
  [233, absHeight],
  [0, 0],
  [0, gravity],
);
const obstacleParams = new params(
  obstacle,
  75,
  150,
  [absWidth, absHeight],
  [-step, 0],
  [0, 0],
);
const decorParams = new params(
  decor,
  125,
  60,
  [absWidth, 130],
  [-step, 0],
  [0, 0],
);
const plr = new box(plrParams);
const decorList = [];
const obstacleList = [];
let posSum = 310;
for (let i = 0; i < 5; i += 1) {
  let obstacle = new spike(obstacleParams);

  obstacle.pos = [obstacle.pos[0] + posSum * i, obstacle.pos[1]];
  obstacleList.push(obstacle);
}

for (let i = 0; i < 25; i += 1) {
  let decor = new spike(decorParams);

  decor.pos = [
    decor.pos[0] + getRandomInt(120, 500) * i,
    decor.pos[1] + 50 * Math.sin(posSum * i),
  ];
  decorList.push(decor);
}

let Deaths = 0;

// Draw order very important
function globalTick() {
  ctx.clearRect(0, 0, absWidth, absHeight);
  bgRoll();

  for (const decor of decorList) {
    decor.stepMovement();
    decor.draw();
  }

  plr.stepMovement();
  plr.draw();

  for (const obstacle of obstacleList) {
    obstacle.stepMovement();
    obstacle.draw();

    if (obstacle.left > plr.right || obstacle.right < plr.left) {
      continue;
    }
    // REDUNDANT UNTIL BIRDS ARE ADDED
    if (obstacle.bottom < plr.top || obstacle.top > plr.bottom) {
      continue;
    }
    Deaths += 1;
    gameData.textContent = "Deaths: " + Deaths;
    // KILLLLLLLL
  }
}

function init() {
  setInterval(globalTick, 16);

  document.addEventListener("keydown", function (event) {
    if (event.key !== "w" || plr.velo[1] !== 0) {
      return;
    }

    plr.velo[1] -= jumpPower;
  });
}

init();
