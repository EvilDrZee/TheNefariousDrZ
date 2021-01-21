# The Nefarious Dr Z
A Tic-Tac-Toe app that plays against the user and does not lose. Made entirely using JavaScript and JQuery.

Inspired by "Dr Nim", an unbeatable toy from the 1960s.

The code utilizes object notation to represent each square of the grid as a list of properties which represent the relative positions of the squares. This allows for reduced coding as the code is all rotationally symmetrical, meaning it doesn't matter which corner the user plays on the first move, only that they played a corner.

Likewise, this means if a user plays any corner and then one of the two adjacent edges, the same code is utilized for each corner and edge pair, reducing the code needed to cover all cases.
