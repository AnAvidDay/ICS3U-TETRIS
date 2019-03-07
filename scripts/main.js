/* retrive STATIC_GRID by saving canvas in a variable */
const STATIC_GRID = document.getElementById("static-grid");
const STATIC_CTX = STATIC_GRID.getContext("2d");
const DYNAMIC_GRID = document.getElementById("dynamic-grid");
const DYNAMIC_CTX = DYNAMIC_GRID.getContext("2d");

/* constants */
const SQUARE_PXL = 35;  // num pixels per square on STATIC_GRID
const HEIGHT = 700;     // height of STATIC_GRID in num pixels
const WIDTH = 350;      // width of STATIC_GRID in num pixels

/* fill in each individual square in the STATIC_GRID */

function update() {
  for (let i = 0; i < tetr["L"].length; i++) {
    DYNAMIC_CTX.fillStyle = "blue";
    DYNAMIC_CTX.fillRect(col_state+(tetr["L"][i][1]*36), row_state+(tetr["L"][i][0]*36), SQUARE_PXL, SQUARE_PXL);
  }
}

/* initialize root position of individual falling tetromino */
var row_state = -36, col_state = 180;

var callCount = 0;

/* game loop */
function loop() {
  callCount++;  // increment by 1 each count

  /* every 10 calls we update tetrimino downward by one square */
  if (callCount == 40) {
    /* clear canvas to erase old tetromino */
    DYNAMIC_CTX.clearRect(0, 0, WIDTH, HEIGHT);
    row_state += 36;    // move downwards a single block
    update();           // update canvas by redrawing new pos
    callCount = 0;
  }
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
