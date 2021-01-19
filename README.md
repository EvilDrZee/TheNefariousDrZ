# The Nefarious Dr Z
A Tic-Tac-Toe app that plays against the user and does not lose. Made entirely using JavaScript and JQuery.

The code utilizes object notation to represent each square of the grid as a list of properties which represent the relative positions of the squares. This allows for reduced coding as the code is all rotationally symmetrical, meaning it doesn't matter which corner the user plays on the first move, only that they played a corner.

Likewise, this means if a user plays any corner and then one of the two adjacent edges, the same code is utilized for each corner and edge pair, reducing the code needed to cover all cases.

Example:
1. Player plays the top-left corner
2. Dr Z plays the center
3. Player plays the top-middle square
4. Code path selected for a Corner+AdjacentEdge case

VS

1. Player plays the bottom-left corner
2. Dr Z plays the center
3. Player plays the bottom-middle square
4. Code path selected for a Corner+AdjacentEdge case
