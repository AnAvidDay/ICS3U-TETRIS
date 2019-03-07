/*
the following are the directions of making each individual tetromino.
Starting from the bottom right-most square, we build up.

directions given in [c, r] where r is the row increment and c the column increment relative to the root square

the tetrominos are given in this order: I, O, T, J, L, S, Z
*/

/* stores tetrminoes in a dictionary for easy access */
var tetr = {}

/* save tetriminoes as letters. */
tetr["I"] = [[0, 0], [0, -1], [0, -2], [0, -3]];
tetr["O"] = [[0, 0], [0, -1], [-1, 0], [-1, -1]];
tetr["T"] = [[0, 0], [-1, 0], [-1, -1], [-1, 1]];
tetr["J"] = [[0, 0], [-1, 0], [-1, -1], [-1, -2]];
tetr["L"] = [[0, 0], [-1, 0], [-1, 1], [-1, 2]];
tetr["S"] = [[0, 0], [0, -1], [-1, 0], [-1, 1]];
tetr["Z"] = [[0, 0], [0, -1], [-1, -1], [-1, -2]];
