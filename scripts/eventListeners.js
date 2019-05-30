/*
David Xiao
Thursday, May 30th, 2019

This file holds all the event listeners. It reads the user's key inputs
for the main file to use.
*/

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
  speedLimit = maxSpeedLimit;

  // if user presses up arrow, change state by 1
  // up arrow means just the state
  if (event.keyCode == 38 && !wall(1, 1) && !wall(2, 1)) {
    // the configuration state goes to the next state
    configState++;
    // config state is reset to the beginning for a full "cycle"
    configState %= tetr[currTet].config.length;
  }

  // b key acts as a toggle. While active, all falling tetrominoes will be I blocks.
  if (event.keyCode == 66) {
    cheatCode = !cheatCode; // swap boolean to either true or false by adding not
  }
});
