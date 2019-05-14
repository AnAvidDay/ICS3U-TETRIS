/* BUGS
when you move left, you can move into the blocks

*/
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

/* initialize root position of individual falling `tetr`omino */
var row_state = -36, col_state = 180;

var callCount = 0;   // count the number of calls done by game loop
var speedLimit = 50; // Threshhold for when call count reaches the speedLimit

/*
I, O, T, J, L, S, Z
0, 1, 2, 3, 4, 5, 6
*/
var currTet = Math.floor(Math.random() * 7); // initial tetromino
var configState = 0;                         // initial configuration

/* update canvas by drawing in new position of tetromino */
function update() {
  DYNAMIC_CTX.fillStyle = "#bc4d9b";
  for (let i = 0; i < tetr[currTet].config[configState].length; i++) {
    DYNAMIC_CTX.fillRect(col_state+(tetr[currTet].config[configState][i][1]*36), row_state+(tetr[currTet].config[configState][i][0]*36), SQUARE_PXL, SQUARE_PXL);
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
  for (let i = 0; i < tetr[currTet].config[configState].length; i++) {
    /* current pos for each block*/
    let row = row_state + tetr[currTet].config[configState][i][0]*36;
    let col = col_state + tetr[currTet].config[configState][i][1]*36;
    /* see if any obstructions directly below */
    let in_range = row_state > 0; // cannot check occupied if row_state < 0
    if (row > HEIGHT - SQUARE_PXL || (in_range && occupied[row/36 + 1][col/36])) {
      return true;
    }
  }
  return false;
}

/* for setting the tetrominoes
   in place if they land */
function add() {
  /* iterate through every block in the tetromino */
  for (let i = 0; i < tetr[currTet].config[configState].length; i++) {
    /* current pos for each block*/
    let row = row_state + tetr[currTet].config[configState][i][0]*36;
    let col = col_state + tetr[currTet].config[configState][i][1]*36;

    /* set it in occupied */
    occupied[row/36][col/36] = true;
  }
}

//only run when a row is cleared!
function fallDown(bottomRow) {
  // starting from the bottom, iterate upwards and bring down
  // any blocks with space beneath them
  console.log(bottomRow);
  for (let i = bottomRow-1; i >= 0; i--) {
    for (let j = 0; j < 10; j++) {
      let fall = i+1;
      while(!occupied[fall][j]) {
        fall++;
        if (fall == bottomRow+1) break;
      }
      fall--;
      if (occupied[i][j] && !occupied[fall][j]) {
        occupied[fall][j] = 1;
        occupied[i][j] = 0;
      }
    }
  }
}

/* tetris is when they clear a block */
function tetris() {
  let rowCleared = false;
  let last = 0;
  for (let i = 19; i >= 0; i--) {
    var cnt = 0;  // counter
    for (let j = 0; j < 10; j++) {
      if (occupied[i][j]) cnt++;
    }
    /* if it is a tetris, remove entire row */
    if (cnt == 10) {
      rowCleared = true;
      last = i;
      for (let j = 0; j < 10; j++) {
        occupied[i][j] = false;
      }
    }
  }
  if (rowCleared) fallDown(last);
}

/* game loop */
function loop() {
  callCount++;  // increment by 1 each count

  /*
  - moves tetrominoes based on which key is pressed
  - check when it hits a wall
  - in order to limit speed, only update when callcount is a multiple of 5.
  */
  if (keyState[37] && callCount % 5 == 0 && !wall(1, 0)) {
    col_state -= SQUARE_PXL + 1;
  }
  // up arrow means just the state
  if (keyState[38] && callCount % 5 == 0 && !wall(1, 1) && !wall(2, 1)) {
    configState++;
    configState %= tetr[currTet].config.length;
  }
  if (keyState[39] && callCount % 5 == 0 && !wall(2, 0)) {
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

      // check if tetris has occured
      /* check if an entire row is true
         and remove it if it is */
      tetris();

      currTet = Math.floor(Math.random() * 7); // generate new tetromino
      configState = 0;                         // reset configuration
      row_state = -36; col_state = 180;        // reset to initial pos
    }
    row_state += 36;    // move downwards a single block
    callCount = 0;
  }
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
