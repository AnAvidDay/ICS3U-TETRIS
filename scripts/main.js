/* retrive STATIC_GRID by saving canvas in a variable */
const STATIC_GRID = document.getElementById("static-grid");
const STATIC_CTX = STATIC_GRID.getContext("2d");
const DYNAMIC_GRID = document.getElementById("dynamic-grid");
const DYNAMIC_CTX = DYNAMIC_GRID.getContext("2d");

/* constants */
const SQUARE_PXL = 35;  // num pixels per square on STATIC_GRID
const HEIGHT = 700;     // height of STATIC_GRID in num pixels
const WIDTH = 350;      // width of STATIC_GRID in num pixels

/* initialize 2d boolean array to tell whether a block
   is occupied or not */
var occupied = [];
var row = []; // temporary row
for (let i = 1; i <= 20; i++) {
  row = [];
  for (let j = 1; j <= 10; j++) {
    row.push(false);
  }
  // push row into occupied
  occupied.push(row);
}

/* initialize root position of individual falling tetromino */
var row_state = -36, col_state = 180;

var callCount = 0;   // count the number of calls done by game loop
var speedLimit = 50; // Threshhold for when call count reaches the speedLimit

/*
I, O, T, J, L, S, Z
0, 1, 2, 3, 4, 5, 6
*/
var currTet = Math.floor(Math.random() * 7); // initial tetromino

/* update canvas by drawing in new position of tetromino */
function update() {
  DYNAMIC_CTX.fillStyle = "#bc4d9b";
  for (let i = 0; i < tetr[currTet].length; i++) {
    DYNAMIC_CTX.fillRect(col_state+(tetr[currTet][i][1]*36), row_state+(tetr[currTet][i][0]*36), SQUARE_PXL, SQUARE_PXL);
  }
  // draw any set tetrominoes
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (occupied[i][j]) {
        DYNAMIC_CTX.fillRect(j*36, i*36, SQUARE_PXL, SQUARE_PXL);
      }
    }
  }
}

/* hit and out-of-bounds checker */
function check() {
  /* iterate through every block in the tetromino */
  for (let i = 0; i < tetr[currTet].length; i++) {
    /* current pos for each block*/
    let row = row_state + tetr[currTet][i][0]*36;
    let col = col_state + tetr[currTet][i][1]*36;
    /* see if any obstructions directly below */
    let in_range = row_state > 0; // cannot check occupied if row_state < 0
    if (row > HEIGHT - SQUARE_PXL || (in_range && occupied[row/36 + 1][col/36])) {
      return true;
    }
  }
  return false;
}

function add() {
  /* iterate through every block in the tetromino */
  for (let i = 0; i < tetr[currTet].length; i++) {
    /* current pos for each block*/
    let row = row_state + tetr[currTet][i][0]*36;
    let col = col_state + tetr[currTet][i][1]*36;

    /* set it in occupied */
    occupied[row/36][col/36] = true;
  }
}

/* game loop */
function loop() {
  callCount++;  // increment by 1 each count

  /*
  - moves tetrominoes based on which key is pressed
  - check when it hits a wall
  - in order to limit speed, only update when callcount is a multiple of 5.
  */
  if (keyState[37] && callCount % 5 == 0 && !wall(1)) {
    col_state -= SQUARE_PXL + 1;
  }
  if (keyState[39] && callCount % 5 == 0 && !wall(2)) {
    col_state += SQUARE_PXL + 1;
  }
  // move faster when down arrow is pressed
  if (keyState[40]) {
    speedLimit = 5;
  }

  /* draw tetromino */
  /* clear canvas to erase old tetromino */
  DYNAMIC_CTX.clearRect(0, 0, WIDTH+20, HEIGHT+20);
  update();  // update canvas by redrawing new pos

  /* every 10 calls we update tetrimino downward by one square */
  if (callCount >= speedLimit) {
    /* check if tetromino is out of bounds or hits a structure */
    if (check()) {
      // add the current tetromino to the occupied grid and set it.
      add();
      currTet = Math.floor(Math.random() * 7); // generate new tetromino
      row_state = -36; col_state = 180;        // reset to initial pos
    }
    row_state += 36;    // move downwards a single block
    callCount = 0;
  }
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
