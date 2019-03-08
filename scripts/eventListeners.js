/*
checker for left and right walls
*/
function wall(side) {
  /* iterate through every block in the tetromino */
  for (let i = 0; i < tetr[currTet].length; i++) {
    /* current pos for each block*/
    let col = col_state + tetr[currTet][i][1]*36;

    /* see if obstructions on left or right side */
    if (col <= 0 && side == 1) {
      return true;
    } else if (col >= WIDTH - SQUARE_PXL && side == 2) {
      return true;
    }
  }
  return false;
}

/* add event listeners for key presses */
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 37 && !wall(1)) {  // move leftward as long as no wall
    col_state -= SQUARE_PXL + 1;
  } else if (event.keyCode == 39 && !wall(2)) { // move rightward as long as no wall
    col_state += SQUARE_PXL + 1;
  } else if (event.keyCode == 40) { // speeds up when holding down
    speedLimit = 5;
  }
});

/* when key is let go, decrease speed limit */
document.addEventListener("keyup", function(event) {
  speedLimit = 50;
});
