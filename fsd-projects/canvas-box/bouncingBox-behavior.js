// @ts-check

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
    this.width = Params.size[0];
    this.height = Params.size[1];

    this.pos = [0, 0];
    this.velo = [0, 0];
    this.accel = Params.accel;

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
      this.mass,
      [this.width, this.height], //@ts-ignore,
      this.accel,
    );
  }

  // Placeholder
  get top() {
    return this.pos[1];
  }
  get left() {
    return this.pos[0];
  }
  get right() {
    return this.pos[0];
  }
  get bottom() {
    return this.pos[1];
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

  // call this however many times per frame
  // or preferably do a global call
  stepMovement() {
    this.velo[0] += this.accel[0];
    this.velo[1] += this.accel[1];

    this.pos[0] += this.velo[0];
    this.pos[1] += this.velo[1];

    // T-T
    if (this.left <= 0) {
      this.velo[0] *= -1;
      this.pos[0] -= this.left;
    } else if (this.right >= absoluteWidth) {
      this.velo[0] *= -1;
      this.pos[0] += absoluteWidth - this.right;
    }

    if (this.bottom <= 0) {
      this.velo[1] *= -1;
      this.pos[1] -= this.bottom;
    } else if (this.top >= absoluteHeight) {
      this.velo[1] *= -1;
      this.pos[1] += absoluteHeight - this.top;
    }
  }
}

class boxParams {
  /**
   * @param   {string} color
   * @param   {boolean} anchored
   * @param   {number} mass
   * @param   {[number, number]} size
   * @param   {[number, number]} accel
   */ // Not needed, will default if not specified || also sucks since it requries specific order, so do it outside of this
  constructor(color, anchored, mass, size, accel) {
    this.color = color ? color : `hsl(${Math.random() * 360}, 50%, 50%)`;
    this.anchored = anchored ? anchored : false;
    this.mass = mass ? mass : 1;
    this.size = size ? size : [10, 10];
    this.accel = accel ? accel : [0, 0];
  }
}

const errorParams = new boxParams(
  "hsl(300, 100%, 50%)",
  true,
  1,
  [100, 100],
  [0, 1],
);

//------------- EXPORTED METHODS -------------\\

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

let basicParams = new Physics.boxParams("white", false, 10, [50, 50], [0, 0.4]);

let newBox = Physics.entityCreate(basicParams);

Physics.init();
