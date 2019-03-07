/* retrive grid by saving canvas in a variable */
const GRID = document.getElementById("static-grid");
const CTX = GRID.getContext("2d");

/* constants */
const SQUARE_PXL = 35;  // num pixels per square on grid
const HEIGHT = 700;     // height of grid in num pixels
const WIDTH = 350;      // width of grid in num pixels

/* fill in each individual square in the grid */
function fill() {
  for (let w = 0; w <= WIDTH; w += SQUARE_PXL + 1) {
    for (let h = 0; h <= HEIGHT; h += SQUARE_PXL + 1) {
      if (w % 5 == 0) CTX.fillStyle = "#FF0000";  // test
      else CTX.fillStyle = "blue";

      CTX.fillRect(w, h, SQUARE_PXL, SQUARE_PXL);
    }
  }
}

fill();
