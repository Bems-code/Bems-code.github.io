let code = "done";

let bg = document.querySelector(".bg");
let char = document.querySelector(".char");
let obstacle = document.querySelector(".reset"); // make this a  div
const board = document.querySelector(".board");
const canvas = board.querySelector("canvas");
const rect = board.getBoundingClientRect();
const ctx = canvas.getContext("2d");

const absWidth = rect.width;
const absHeight = rect.height;

const gravity = 9.82; // earth

canvas.width = absWidth;
canvas.height = absHeight;

let x = absWidth;

const floor = 230;
const step = 6;

const halfWidth = absWidth / 2;
const halfHeight = absHeight / 2;

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
    return this.pos[1] - this.height / 2;
  }
  get top() {
    return this.pos[1] + this.height / 2;
  }
  get left() {
    return this.pos[0] - this.width / 2;
  }
  get right() {
    return this.pos[0] + this.width / 2;
  }

  draw() {
    ctx.drawImage(this.img, this.pos[0], this.pos[1], this.width, this.height);
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

    if (this.bottom <= 0) {
      this.velo[1] *= -1;
      this.pos[1] -= this.bottom;
    } else if (this.top >= absHeight) {
      this.velo[1] *= -1;
      this.pos[1] += absHeight - this.top;
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

    if (this.bottom <= 0) {
      this.velo[1] *= -1;
      this.pos[1] -= this.bottom;
    } else if (this.top >= absHeight) {
      this.velo[1] *= -1;
      this.pos[1] += absHeight - this.top;
    }
  }
}

//spike is linear, slime uses sin for y axis too
class slime extends box {
  constructor(Params) {
    super(Params);
  }

  stepMovement() {}
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
const plrParams = new params(char, 90, 90, [233, halfHeight], [0, 0], [0, 0]);
const obstacleParams = new params(
  obstacle,
  75,
  150,
  [absWidth, halfHeight - plrParams.height / 2],
  [-step, 0],
  [0, 0],
);
const plr = new box(plrParams);
const obstacleList = [];
let posSum = 232;
for (let i = 0; i < 5; i += 1) {
  let obstacle = new spike(obstacleParams);

  obstacle.pos = [obstacle.pos[0] + posSum * i, obstacle.pos[1]];
  obstacleList.push(obstacle);
}

function globalTick() {
  ctx.clearRect(0, 0, absWidth, absHeight);
  bgRoll();
  plr.draw();

  for (const obstacle of obstacleList) {
    obstacle.stepMovement();
    obstacle.draw();

    if (obstacle.left > plr.right || obstacle.right < plr.left) {
      continue;
    }
    if (obstacle.bottom > plr.top || obstacle.top < plr.bottom) {
      continue;
    }
    console.log("dead");
    // KILLLLLLLL
  }
}

function init() {
  setInterval(globalTick, 16);
}

init();
