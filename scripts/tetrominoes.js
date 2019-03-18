/*
the following are the directions of making each individual tetromino.
Starting from the middle-most square, we build up.

directions given in [r, c] where r is the row increment and c the column increment relative to the root square

the tetrominos are given in this order: I, O, T, J, L, S, Z
*/

/* stores tetrminoes in a dictionary for easy access */
var tetr = {}

/* save tetriminoes as letters. */
tetr[0] = [[0, 0], [0, -1], [0, 1], [0, 2]];    // root is second square
tetr[1] = [[0, 0], [0, -1], [-1, 0], [-1, -1]]; // root is bottom left
tetr[2] = [[0, 0], [-1, 0], [-1, -1], [-1, 1]]; // root is bottom middle
tetr[3] = [[0, 0], [-1, 0], [1, 0], [1, 1]];    // middle left
tetr[4] = [[0, 0], [-1, 0], [1, 0], [1, -1]];   // middle right
tetr[5] = [[0, 0], [0, -1], [-1, -1], [1, 0]];  // middle block
tetr[6] = [[0, 0], [1, 0], [0, 1], [-1, 1]];    // middle block
