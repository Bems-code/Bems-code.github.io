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
const board = document.querySelector(".board");
const canvas = document.getElementById("canvas"); //@ts-ignore,
const rect = board.getBoundingClientRect(); //@ts-ignore,
const ctx = canvas.getContext("2d");

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
    // do wtv idc

    this.width = 1
    this.height = 1

    this.pos = [0, 0];
    this.velo = [0, 0];

    this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;

    boxList.push(this);
  }

  get bottom() {
    return this.pos[1] - (this.height / 2);
  }

  get top() {
    return this.pos[1] + (this.height / 2);
  }

  get left() {
    return this.pos[0] - (this.width / 2);
  }

  get right() {
    return this.pos[0] + (this.width / 2);
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
      
      this.pos[0] = 0
    }

    if (this.top <= 0) {
      
      this.pos[1] = absoluteHeight - this.top;
    } else if (this.bottom >= absoluteHeight) {
      
      this.pos[1] = 0
    }
  }
}

for (let i = 0; i < 5; i++){

    let varBox = new box()
    varBox.velo[1] = getRandomInt(-5, 5)
    varBox.velo[0] = getRandomInt(-5, 5)
    varBox.pos[0] = getRandomInt(0, absoluteWidth)
    varBox.pos[1] = getRandomInt(0, absoluteHeight)
    varBox.width = getRandomInt(45, 75)
    varBox.height = getRandomInt(45, 75)
}

function init() {
  //@ts-ignore,
  canvas.width = absoluteWidth;
  //@ts-ignore,
  canvas.height = absoluteHeight;
  setInterval(globalTick, 16);
}
init()