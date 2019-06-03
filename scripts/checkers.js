/*
David Xiao
Thursday, May 30th, 2019

Contains the checkers that are used in the program.
Check for moving out of bounds (left, right, and bottom)
check for obstructions (left, right, and bottom)
checkers also used during rotations.
*/

/* checker for any obstructions below or hitting the bottom */
function check() {
  /* iterate through every block in the tetromino */
  for (let i = 0; i < tetr[currTet].config[configState].length; i++) {
    /* current pos for each block*/
    let row = row_state + tetr[currTet].config[configState][i][0]*36;
    let col = col_state + tetr[currTet].config[configState][i][1]*36;
    /* see if any obstructions directly below */
    let in_range = row >= 0; // cannot check occupied if row_state < 0
    if (row > HEIGHT - SQUARE_PXL || (in_range && occupied[row/36 + 1][col/36])) {
      return true;
    }
  }
  return false;
}

/*
checker for left and right walls
side parameter determines the side the user is moving towards
rotate parameter determines if the action is a rotation, or just a movement
return a boolean on whether the move is legal or not
*/
function wall(side, rotate) {
  // create newConfigState to store either the current config state or
  // the next if we are changing configurations.
  let newConfigState = (configState+rotate) % tetr[currTet].config.length;

  /* iterate through every block in the tetromino */
  for (let i = 0; i < tetr[currTet].config[newConfigState].length; i++) {
    /* current pos for each block*/
    let col = col_state + tetr[currTet].config[newConfigState][i][1] * 36;
    let row = row_state + tetr[currTet].config[newConfigState][i][0] * 36;

    /* to make sure tetrominoe does not go out-of-bounds
     when moving to the left or moving to the right or rotating */
    if (rotate == 0) {  // for moving left and right
      if (col <= 0 && side == 1) {
        return true;
      } else if (col >= WIDTH - SQUARE_PXL && side == 2) {
        return true;
      }
    } else {            // for rotations
      if (col < 0 && side == 1) {
        return true;
      } else if (col >= WIDTH && side == 2) {
        return true;
      }
    }

    /* to make sure tetrominoe does not hit any obstructions (occupied blocks)
     when moving to the left or moving to the right or rotating*/
    if (rotate == 0) {  // for moving left and right
      if (occupied[Math.max(0, row/36)][col/36 - 1] && side == 1) { // ensure index always greater than or equal to 0
        return true;
      } else if (occupied[Math.max(0, row/36)][col/36 + 1] && side == 2) {
        return true;
      }
    } else {            // for rotations
      if (occupied[Math.max(0, row/36)][col/36] && side == 1) {
        return true;
      } else if (occupied[Math.max(0, row/36)][col/36] && side == 2) {
        return true;
      }
    }
  }

  // otherwise the move is legal.
  return false;
}
