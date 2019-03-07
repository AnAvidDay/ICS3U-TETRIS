/* retrive grid by saving canvas in a variable */
const GRID = document.getElementById("main-grid");
const CTX = GRID.getContext("2d");
CTX.fillStyle = "#FF0000";  // color to use for each square

/*
CTX.fillStyle = "#FF0000";
CTX.fillRect(35, 0, 35, 35);
*/

/* constants */
const SQUARE_PXL = 35;  // num pixels per square on grid
const HEIGHT = 700;     // height of grid in num pixels
const WIDTH = 350;      // width of grid in num pixels

/* fill each individual square in the grid */
function fill() {
  for (let i = 0; i <= WIDTH; i += SQUARE_PXL + 1) {
    for (let j = 0; j <= HEIGHT; j += SQUARE_PXL + 1) {
      CTX.fillRect(i, j, SQUARE_PXL, SQUARE_PXL);
    }
  }
}

fill();
