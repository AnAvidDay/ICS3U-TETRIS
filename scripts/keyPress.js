/* add event listeners for key presses */
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 37) {
    col_state -= SQUARE_PXL + 1;
  } else if (event.keyCode == 39) {
    col_state += SQUARE_PXL + 1;
  }
});
