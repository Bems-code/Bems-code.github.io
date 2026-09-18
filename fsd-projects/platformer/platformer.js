$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(
      -50,
      canvas.height - 10,
      canvas.width + 100,
      200,
      "rgb(118, 0, 233)",
    ); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    toggleGrid();

    // TODO 2 - Create Platforms
    createPlatform(
      getRandomInt(0, canvas.width),
      getRandomInt(0, canvas.height),
      getRandomInt(50, 350),
      getRandomInt(50, 350),
      getRandomInt(0, 1) === 1 ? "red" : "lime",
    );
    createPlatform(
      getRandomInt(0, canvas.width),
      getRandomInt(0, canvas.height),
      getRandomInt(50, 350),
      getRandomInt(50, 350),
      getRandomInt(0, 1) === 1 ? "red" : "lime",
    );
    createPlatform(
      getRandomInt(0, canvas.width),
      getRandomInt(0, canvas.height),
      getRandomInt(50, 350),
      getRandomInt(50, 350),
      getRandomInt(0, 1) === 1 ? "red" : "lime",
    );
    createPlatform(
      getRandomInt(0, canvas.width),
      getRandomInt(0, canvas.height),
      getRandomInt(50, 350),
      getRandomInt(50, 350),
      getRandomInt(0, 1) === 1 ? "red" : "lime",
    );
    createPlatform(
      getRandomInt(0, canvas.width),
      getRandomInt(0, canvas.height),
      getRandomInt(50, 350),
      getRandomInt(50, 350),
      getRandomInt(0, 1) === 1 ? "red" : "lime",
    );
    createPlatform(
      getRandomInt(0, canvas.width),
      getRandomInt(0, canvas.height),
      getRandomInt(50, 350),
      getRandomInt(50, 350),
      getRandomInt(0, 1) === 1 ? "red" : "lime",
    );
    createPlatform(
      getRandomInt(0, canvas.width),
      getRandomInt(0, canvas.height),
      getRandomInt(50, 350),
      getRandomInt(50, 350),
      getRandomInt(0, 1) === 1 ? "red" : "lime",
    );

    // TODO 3 - Create Collectables
    createCollectable(
      getRandomInt(0, 1) === 1 ? "steve" : "diamond",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
      0.5,
      0.7,
    );
    createCollectable(
      getRandomInt(0, 1) === 1 ? "steve" : "diamond",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
      0.5,
      0.7,
    );
    createCollectable(
      getRandomInt(0, 1) === 1 ? "steve" : "diamond",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
      0.5,
      0.7,
    );
    createCollectable(
      getRandomInt(0, 1) === 1 ? "steve" : "diamond",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
      0.5,
      0.7,
    );
    createCollectable(
      getRandomInt(0, 1) === 1 ? "steve" : "diamond",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
      0.5,
      0.7,
    );
    createCollectable(
      getRandomInt(0, 1) === 1 ? "steve" : "diamond",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
      0.5,
      0.7,
    );
    createCollectable(
      getRandomInt(0, 1) === 1 ? "steve" : "diamond",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
      0.5,
      0.7,
    );
    createCollectable(
      getRandomInt(0, 1) === 1 ? "steve" : "diamond",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
      0.5,
      0.7,
    );

    // TODO 4 - Create Cannons

    createCannon(
      getRandomInt(0, 1) === 1 ? "right" : "top",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
    );
    createCannon(
      getRandomInt(0, 1) === 1 ? "right" : "top",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
    );
    createCannon(
      getRandomInt(0, 1) === 1 ? "right" : "top",
      getRandomInt(100, 500),
      getRandomInt(100, 500),
    );

    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
