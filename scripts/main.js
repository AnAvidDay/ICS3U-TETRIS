/* retrive STATIC_GRID by saving canvas in a variable */
const STATIC_GRID = document.getElementById("static-grid");
const STATIC_CTX = STATIC_GRID.getContext("2d");
const DYNAMIC_GRID = document.getElementById("dynamic-grid");
const DYNAMIC_CTX = DYNAMIC_GRID.getContext("2d");

/* constants */
const SQUARE_PXL = 35;  // num pixels per square on STATIC_GRID
const HEIGHT = 700;     // height of STATIC_GRID in num pixels
const WIDTH = 350;      // width of STATIC_GRID in num pixels

/* initialize root position of individual falling tetromino */
var row_state = -36, col_state = 180;

var callCount = 0;  // count the number of calls done by game loop

/*
I, O, T, J, L, S, Z
0, 1, 2, 3, 4, 5, 6
*/
var currTet = Math.floor(Math.random() * 7); // initial tetromino

/* update canvas by drawing in new position of tetromino */
function update() {
  for (let i = 0; i < tetr[currTet].length; i++) {
    DYNAMIC_CTX.fillStyle = "blue";
    DYNAMIC_CTX.fillRect(col_state+(tetr[currTet][i][1]*36), row_state+(tetr[currTet][i][0]*36), SQUARE_PXL, SQUARE_PXL);
  }
}

/* hit and out-of-bounds checker */
function check() {
  /* iterate through every block in the tetromino */
  for (let i = 0; i < tetr[currTet].length; i++) {
    /* current pos for each block*/
    let col = col_state + tetr[currTet][i][1]*36;
    let row = row_state + tetr[currTet][i][0]*36;

    /* see if any obstructions directly below */
    if (row > HEIGHT - SQUARE_PXL) return true;
  }
  return false;
}

/* game loop */
function loop() {
  callCount++;  // increment by 1 each count

  /* draw tetromino */
  /* clear canvas to erase old tetromino */
  DYNAMIC_CTX.clearRect(0, 0, WIDTH+20, HEIGHT+20);
  update();  // update canvas by redrawing new pos

  /* check if tetromino is out of bounds or hits a structure */
  if (check()) {
    currTet = Math.floor(Math.random() * 7); // generate new tetromino
    row_state = -36; col_state = 180;        // reset to initial pos
  }

  /* every 10 calls we update tetrimino downward by one square */
  if (callCount == 50) {
    row_state += 36;    // move downwards a single block
    callCount = 0;
  }
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
