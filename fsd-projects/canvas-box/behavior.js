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
let entityList = [];

function globalTick() {
  ctx.clearRect(0, 0, absoluteWidth, absoluteHeight);

  for (const entity of entityList) {
    entity.stepMovement();
    entity.draw();
  }
}

class box {
  /** @param   {boxParams} Params */
  constructor(Params) {
    // do wtv idc

    this.width = 1
    this.height = 1

    this.pos = [0, 0];
    this.velo = [0, 0];

    //this.friction = 0.1   // bruh add this already // bruuuu
    this.mass = Params.mass;
    this.invMass = !Params.anchored ? 1 / this.mass : 0;

    this.color = Params.color;

    entityList.push(this);
  }

  get _params() {
    return new boxParams(
      this.color,
      this.anchored,
      this.mass
    );
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

  get anchored() {
    return this.invMass <= 0 ? true : false;
  }

  /**
   * @param   {number} x
   * @param   {number} y
   */ // we find cloeset edge based on pos || needed for collisions
  nearestEdge(x, y) {
    let closeX = x;
    let closeY = y;

    if (x > this.right) {
      closeX = this.right;
    } else if (x < this.left) {
      closeX = this.left;
    }

    if (y > this.top) {
      closeY = this.top;
    } else if (y < this.bottom) {
      closeY = this.bottom;
    }

    return [closeX, closeY];
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

    // T-T
    if (this.right <= 0) {
      
      this.pos[0] = absoluteWidth - this.right;
    } else if (this.left >= absoluteWidth) {
      
      this.pos[0] = 0 // make this smoother
    }

    if (this.top <= 0) {
      
      this.pos[1] = absoluteHeight - this.top;
    } else if (this.bottom >= absoluteHeight) {
      
      this.pos[1] = 0
    }
  }
}

class boxParams {
  /**
   * @param   {string} color
   * @param   {boolean} anchored
   * @param   {number} mass
   */ // Not needed, will default if not specified || also sucks since it requries specific order, so do it outside of this
  constructor(color, anchored, mass) {
    this.color = color ? color : `hsl(${Math.random() * 360}, 50%, 50%)`;
    this.anchored = anchored ? anchored : false;
    this.mass = mass ? mass : 1;
  }
}

const errorParams = new boxParams(
  "hsl(300, 100%, 50%)",
  true,
  1,
);


/**
 * @param {boxParams} params
 * @returns {box}
 */
function entityCreate(params) {
  let entity = new box(params);
  if (!entity) {
    console.error("__INVALID_ENTITY_TYPE__");
    return new box(errorParams);
  }

  return entity;
}

function init() {
  //@ts-ignore,
  canvas.width = absoluteWidth;
  //@ts-ignore,
  canvas.height = absoluteHeight;
  setInterval(globalTick, 16);
}

const Physics = {
  init: init,
  entityCreate: entityCreate,
  boxParams: boxParams,
};

// pretend everything below here is in different file

let basicParams = new Physics.boxParams('white', false, 10);

for (let i = 0; i < 5; i++){

    let box = Physics.entityCreate(basicParams);
    box.velo[1] = getRandomInt(-5, 5)
    box.velo[0] = getRandomInt(-5, 5)
    box.pos[0] = getRandomInt(0, absoluteWidth)
    box.pos[1] = getRandomInt(0, absoluteHeight)
    box.width = getRandomInt(45, 75)
    box.height = getRandomInt(45, 75)

    box.color = `hsl(${Math.random() * 360}, 70%, 50%)`
}

console.log(entityList)


Physics.init();
