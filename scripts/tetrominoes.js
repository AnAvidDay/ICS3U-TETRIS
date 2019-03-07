/*
the following are the directions of making each individual tetromino.
Starting from the bottom right-most square, we build up.

directions given in [c, r] where r is the row increment and c the column increment relative to the root square

the tetrominos are given in this order: I, O, T, J, L, S, Z
*/

/* stores tetrminoes in a dictionary for easy access */
var tetr = {}

/* save tetriminoes as letters. */
tetr[0] = [[0, 0], [0, -1], [0, -2], [0, -3]];
tetr[1] = [[0, 0], [0, -1], [-1, 0], [-1, -1]];
tetr[2] = [[0, 0], [-1, 0], [-1, -1], [-1, 1]];
tetr[3] = [[0, 0], [-1, 0], [-1, -1], [-1, -2]];
tetr[4] = [[0, 0], [-1, 0], [-1, 1], [-1, 2]];
tetr[5] = [[0, 0], [0, -1], [-1, 0], [-1, 1]];
tetr[6] = [[0, 0], [0, -1], [-1, -1], [-1, -2]];
