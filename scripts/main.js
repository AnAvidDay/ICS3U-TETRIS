/* retrive STATIC_GRID by saving canvas in a variable */
const STATIC_GRID = document.getElementById("static-grid");
const STATIC_CTX = STATIC_GRID.getContext("2d");
const DYNAMIC_GRID = document.getElementById("dynamic-grid");
const DYNAMIC_CTX = DYNAMIC_GRID.getContext("2d");

/* constants */
const SQUARE_PXL = 35;  // num pixels per square on STATIC_GRID
const HEIGHT = 700;     // height of STATIC_GRID in num pixels
const WIDTH = 350;      // width of STATIC_GRID in num pixels

/* fill in each individual square in the STATIC_GRID */
function fill() {
  for (let w = 0; w <= WIDTH; w += SQUARE_PXL + 1) {
    for (let h = 0; h <= HEIGHT; h += SQUARE_PXL + 1) {
      STATIC_CTX.fillStyle = "grey";

      STATIC_CTX.fillRect(w, h, SQUARE_PXL, SQUARE_PXL);
    }
  }
}

//fill();
