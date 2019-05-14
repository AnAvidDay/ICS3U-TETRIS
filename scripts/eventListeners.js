/*
BUGS:
Delay on right side
*/

/*
checker for left and right walls
*/
function wall(side, change) {
  // create newConfigState to store either the current config state or
  // the next if we are changing configurations.
  //console.log(configState);
  let newConfigState = (configState+change) % tetr[currTet].config.length;
  //console.log(newConfigState);
  /* iterate through every block in the tetromino */
  for (let i = 0; i < tetr[currTet].config[newConfigState].length; i++) {
    /* current pos for each block*/
    let col = col_state + tetr[currTet].config[newConfigState][i][1] * 36;
    let row = row_state + tetr[currTet].config[newConfigState][i][0] * 36;
    // to make sure tetrominoe does not go out-of-bounds
    if (change == 0) {
      if (col <= 0 && side == 1) {
        return true;
      } else if (col >= WIDTH - SQUARE_PXL && side == 2) {
        return true;
      }
    } else {
      if (col < 0 && side == 1) {
        return true;
      } else if (col >= WIDTH && side == 2) {
        return true;
      }
    }

    /* see if obstructions on left or right side
      by checking for tetriminoes
    */
    if (change == 0) {
      if (occupied[Math.max(0, row/36)][col/36 - 1] && 1) {
        return true;
      } else if (occupied[Math.max(0, row/36)][col/36 + 1] && 2) {
        return true;
      }
    } else {
      if (occupied[Math.max(0, row/36)][col/36] && 1) {
        return true;
      } else if (occupied[Math.max(0, row/36)][col/36] && 2) {
        return true;
      }
    }
  }
  return false;
}

// records which keys are pressed
let keyState = {};

/* add event listeners for key presses */
document.addEventListener("keydown", function(event) {
  // set the state of the pressed key to true
  keyState[event.keyCode] = 1;
});

/* when key is let go, decrease speed limit */
document.addEventListener("keyup", function(event) {
  // key is no longer pressed.
  keyState[event.keyCode] = 0;
  // speed reset to 50
  speedLimit = 50;
});
