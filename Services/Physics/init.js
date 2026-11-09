// @ts-check
/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

//------------- HTML ELEMENTS -------------\\


//------------- FUNDAMENTALS -------------\\
const absoluteWidth = rect.width;
const absoluteHeight = rect.height;

/** @type {[box]} */ //@ts-ignore
let boxList = [];

function globalTick() {
  ctx.clearRect(0, 0, absoluteWidth, absoluteHeight);

  for (const box of boxList) {
    box.stepMovement();
    box.draw();
  }
}

class box {
  constructor() {
    this.width = 1;
    this.height = 1;

    this.pos = [0, 0];
    this.velo = [0, 0];

    this.color = `hsla(${Math.random() * 360}, 100%, 50%, 0.76)`;

    boxList.push(this);
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
    ctx.beginPath();
    ctx.rect(this.left, this.bottom, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  stepMovement() {
    this.pos[0] += this.velo[0];
    this.pos[1] += this.velo[1];

    if (this.right <= 0) {
      this.pos[0] = absoluteWidth - this.right;
    } else if (this.left >= absoluteWidth) {
      this.pos[0] = 0;
    }

    if (this.top <= 0) {
      this.pos[1] = absoluteHeight - this.top;
    } else if (this.bottom >= absoluteHeight) {
      this.pos[1] = 0;
    }
  }
}

let boxCount = 0;
let boxInterval = setInterval(newBox, 4);
const maxCount = 1_000;
const scale = 2;
const piStep = Math.PI / 36;
const divRadi = 10;
function newBox() {
  if (boxCount >= maxCount) {
    clearInterval(boxInterval);

    for (const varBox of boxList) {
      let dir1 = getRandomInt(-1, 1);
      let dir2 = getRandomInt(-1, 1);
      varBox.velo[1] = getRandomInt(1, 10) * (dir1 === 0 ? 1 : dir1);
      varBox.velo[0] = getRandomInt(1, 10) * (dir2 === 0 ? 1 : dir2);
    }

    return;
  }
  let varBox = new box();
  // prevent 0 velocity

  varBox.pos[0] =
    absoluteWidth / 2 + (boxCount / divRadi) * Math.cos(piStep * boxCount);
  varBox.pos[1] =
    absoluteHeight / 2 + (boxCount / divRadi) * Math.sin(piStep * boxCount);
  varBox.width = getRandomInt(3, 10) * scale;
  varBox.height = getRandomInt(3, 10) * scale;

  boxCount += 1;
  gameData.textContent = "Boxes: " + boxCount;
}

function init() {
  //@ts-ignore,
  canvas.width = absoluteWidth;
  //@ts-ignore,
  canvas.height = absoluteHeight;
  setInterval(globalTick, 16);
}
init();
