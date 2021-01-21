//  Author: Zane Lamb, 000808955
//  Date Created: December 13, 2020
//  
//  This file contains all the JavaScript code and listeners for the tic-tac-toe game.
$(document).ready(function () {

    // each squareX variable represents a square on the game board, and using properties, assigns the relative positions of the other cells, so that all game logic is rotationally symmetrical
    let square1 = {
        name: 1,
        type: "C",
        filled: false,
        pair: 9,
        adj1: 2,
        adj2: 4,
        mid1: 3,
        mid2: 7,
        opp1: 6,
        opp2: 8
    }; 
    let square3 = {
        name: 3,
        type: "C",
        filled: false,
        pair: 7,
        adj1: 6,
        adj2: 2,
        mid1: 9,
        mid2: 1,
        opp1: 8,
        opp2: 4
    };
    let square7 = {
        name: 7,
        type: "C",
        filled: false,
        pair: 3,
        adj1: 4,
        adj2: 8,
        mid1: 1,
        mid2: 9,
        opp1: 2,
        opp2: 6
    };
    let square9 = {
        name: 9,
        type: "C",
        filled: false,
        pair: 1,
        adj1: 8,
        adj2: 6,
        mid1: 7,
        mid2: 3,
        opp1: 4,
        opp2: 2
    };
    let square2 = {
        name: 2,
        type: "E",
        filled: false,
        pair: 8,
        adj1: 3,
        adj2: 1,
        mid1: 6,
        mid2: 4,
        opp1: 9,
        opp2: 7
    };
    let square4 = {
        name: 4,
        type: "E",
        filled: false,
        pair: 6,
        adj1: 1,
        adj2: 7,
        mid1: 2,
        mid2: 8,
        opp1: 3,
        opp2: 9
    };
    let square6 = {
        name: 6,
        type: "E",
        filled: false,
        pair: 4,
        adj1: 9,
        adj2: 3,
        mid1: 8,
        mid2: 2,
        opp1: 7,
        opp2: 1
    };
    let square8 = {
        name: 8,
        type: "E",
        filled: false,
        pair: 2,
        adj1: 7,
        adj2: 9,
        mid1: 4,
        mid2: 6,
        opp1: 1,
        opp2: 3
    };
    let square5 = {
        name: 5,
        type: "M",
        filled: false
    }; // square 5 does not need references to the other cells, as all cases surrounding cell 5 can be played relative to the response move, and therefore there is only one orientation

    let squares = [square1, square2, square3, square4, square5, square6, square7, square8, square9]; // keep the squares in an array to call them based on grid position

    let firstMove = 1;          // Tracks number of starting cell to ensure relative positioning is tracked
    let secondMove = 1;         // Variable to track the player's second move and trigger the game case selection
    let firstType = "C";        // Corner, Edge, or Middle move at the start of the game, helps ensure converging paths (i.e. Cell 1, then 2  vs  Cell 2, then 1) are treated the same
    let holder = "";            // Used mostly as a shorthand to improve readability and allow shorter calls to the relative positions, enables hard-coding for all Mid cases
    let mirrorCheck = "";       // Determines if a case is mirrored, to ensure the correct relative cell is played in response
    let turnCounter = 0;        // Tracks the number of moves made by both the player and "Dr Z."
    let caseLock = false;       // Boolean flag that is triggered when a specific game case is reached, this allows all further plays to call only the appropriate case function

// -------------------------
// GAME CASE FUNCTIONS START
// -------------------------

    /**
     * This function handles the case where the user's first two moves are a corner square and one of the two directly adjacent edge squares (i.e. 1 and 2).
     * 
     */
    function cornerAdj() {
        if (caseLock == false) { // Only the first time this function is called
            caseLock = true;
            if (squares[secondMove - 1].name == squares[firstMove - 1].adj1 && firstType == "C") {
                holder = squares[firstMove - 1].mid1;
                mirrorCheck = "cw";
            } else if (squares[secondMove - 1].name == squares[firstMove - 1].adj2 && firstType == "E") {
                holder = squares[firstMove - 1].adj1;
                mirrorCheck = "cw";
            } else if (firstType == "C") {
                holder = squares[firstMove - 1].mid2;
                mirrorCheck = "cc";
            } else {
                holder = squares[firstMove - 1].adj2;
                mirrorCheck = "cc";
            }
            $("[name=" + holder + "]").html("O").css({
                "color": "red",
                "cursor": "default"
            });
            squares[holder - 1].filled = true;
            turnCounter++;

            $("td").off();
            $("td").on("click", cornerAdj);
        } else {
            if (squares[($(this).attr("name")) - 1].filled == false) {
                turnCounter++;
                squares[($(this).attr("name")) - 1].filled = true;
                $("td").css("color", "black");
                $(this).html("X").css("cursor", "default");
            }

            if (turnCounter == 5) {
                if ($(this).attr("name") == squares[holder - 1].pair && mirrorCheck == "cw") {
                    holder = squares[holder - 1].opp2;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else if ($(this).attr("name") == squares[holder - 1].pair && mirrorCheck == "cc") {
                    holder = squares[holder - 1].opp1;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (mirrorCheck == "cc") {
                        endGame("diag1");
                    } else {
                        endGame("diag2");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 7) {
                if ($(this).attr("name") == squares[holder - 1].pair && mirrorCheck == "cw") {
                    holder = squares[holder - 1].mid2;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else if ($(this).attr("name") == squares[holder - 1].pair && mirrorCheck == "cc") {
                    holder = squares[holder - 1].mid1;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    endGame("line2");
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 9) {
                endGame("cats");
            }
        }
    }

    /**
     * This function handles the case where the user's first two moves are 2 adjacent corner squares (i.e. 1 and 3 *OR* 1 and 7)
     * 
     */
    function cornerMid() {
        if (caseLock == false) { // Only the first time this function is called
            caseLock = true;
            if (squares[secondMove - 1].name == squares[firstMove - 1].mid1) {
                holder = squares[firstMove - 1].adj1;
                mirrorCheck = "cw";
            } else {
                holder = squares[firstMove - 1].adj2;
                mirrorCheck = "cc";
            }
            $("[name=" + holder + "]").html("O").css({
                "color": "red",
                "cursor": "default"
            });
            squares[holder - 1].filled = true;
            turnCounter++;

            $("td").off();
            $("td").on("click", cornerMid);
        } else {
            if (squares[($(this).attr("name")) - 1].filled == false) {
                turnCounter++;
                squares[($(this).attr("name")) - 1].filled = true;
                $("td").css("color", "black");
                $(this).html("X").css("cursor", "default");
            }

            if (turnCounter == 5) {
                if ($(this).attr("name") == squares[holder - 1].pair) {
                    holder = squares[holder - 1].mid2;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 2 || holder == 8) {
                        endGame("vert2");
                    } else {
                        endGame("line2");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 7) {
                if ($(this).attr("name") == squares[holder - 1].pair) {
                    holder = squares[holder - 1].opp2;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 2 || holder == 8) {
                        endGame("vert2");
                    } else {
                        endGame("line2");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 9) {
                endGame("cats");
            }
        }
    }

    /**
     * This function handles the case where the user's first two moves are a corner square and the opposite corner square (i.e. 1 and 9)
     * 
     */
    function cornerPair() {
        if (caseLock == false) { // Only the first time this function is called
            caseLock = true;
            holder = squares[firstMove - 1].adj2;
            $("[name=" + holder + "]").html("O").css({
                "color": "red",
                "cursor": "default"
            });
            squares[holder - 1].filled = true;
            turnCounter++;

            $("td").off();
            $("td").on("click", cornerPair);
        } else {
            if (squares[($(this).attr("name")) - 1].filled == false) {
                turnCounter++;
                squares[($(this).attr("name")) - 1].filled = true;
                $("td").css("color", "black");
                $(this).html("X").css("cursor", "default");
            }

            if (turnCounter == 5) {
                if ($(this).attr("name") == squares[holder - 1].pair) {
                    holder = squares[holder - 1].opp1;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 2 || holder == 8) {
                        endGame("vert2");
                    } else {
                        endGame("line2");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 7) {
                if ($(this).attr("name") == squares[holder - 1].pair) {
                    holder = squares[holder - 1].opp1;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 3 || holder == 7) {
                        endGame("diag2");
                    } else {
                        endGame("diag1");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 9) {
                endGame("cats");
            }
        }
    }

    /**
     * This function handles the case where the user's first two moves are a corner square and one of the two opposite edge squares (i.e. 1 and 6)
     * 
     */
    function cornerOpp() {
        if (caseLock == false) { // Only the first time this function is called
            caseLock = true;
            if (squares[secondMove - 1].name == squares[firstMove - 1].opp2 && firstType == "C") {
                holder = squares[firstMove - 1].adj2;
                mirrorCheck = "cc";
            } else if (squares[secondMove - 1].name == squares[firstMove - 1].opp1 && firstType == "E") {
                holder = squares[firstMove - 1].mid1;
                mirrorCheck = "cc";
            } else if (firstType == "C") {
                holder = squares[firstMove - 1].adj1;
                mirrorCheck = "cw";
            } else {
                holder = squares[firstMove - 1].mid2;
                mirrorCheck = "cw";
            }
            $("[name=" + holder + "]").html("O").css({
                "color": "red",
                "cursor": "default"
            });
            squares[holder - 1].filled = true;
            turnCounter++;

            $("td").off();
            $("td").on("click", cornerOpp);
        } else {
            if (squares[($(this).attr("name")) - 1].filled == false) {
                turnCounter++;
                squares[($(this).attr("name")) - 1].filled = true;
                $("td").css("color", "black");
                $(this).html("X").css("cursor", "default");
            }

            if (turnCounter == 5) {
                if ($(this).attr("name") == squares[holder - 1].pair && mirrorCheck == "cw") {
                    holder = squares[holder - 1].opp2;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else if ($(this).attr("name") == squares[holder - 1].pair && mirrorCheck == "cc") {
                    holder = squares[holder - 1].opp1;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 2 || holder == 8) {
                        endGame("vert2");
                    } else {
                        endGame("line2");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 7) {
                if ($(this).attr("name") == squares[holder - 1].pair && mirrorCheck == "cw") {
                    holder = squares[holder - 1].mid2;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else if ($(this).attr("name") == squares[holder - 1].pair && mirrorCheck == "cc") {
                    holder = squares[holder - 1].mid1;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 1 || holder == 9) {
                        endGame("diag1");
                    } else {
                        endGame("diag2");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 9) {
                endGame("cats");
            }
        }
    }

    /**
     * This function handles the case where the user's first two moves are an edge square and the opposite edge square (i.e. 2 and 8)
     * 
     */
    function edgePair() {
        if (caseLock == false) { // Only the first time this function is called
            caseLock = true;
            holder = squares[firstMove - 1].adj2;
            $("[name=" + holder + "]").html("O").css({
                "color": "red",
                "cursor": "default"
            });
            squares[holder - 1].filled = true;
            turnCounter++;

            $("td").off();
            $("td").on("click", edgePair);
        } else {
            if (squares[($(this).attr("name")) - 1].filled == false) {
                turnCounter++;
                squares[($(this).attr("name")) - 1].filled = true;
                $("td").css("color", "black");
                $(this).html("X").css("cursor", "default");
            }

            if (turnCounter == 5) {
                if ($(this).attr("name") == squares[holder - 1].pair) {
                    holder = squares[holder - 1].mid2;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 1 || holder == 9) {
                        endGame("diag1");
                    } else {
                        endGame("diag2");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 7) {
                if ($(this).attr("name") == squares[holder - 1].pair) {
                    holder = squares[holder - 1].adj1;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 1) {
                        endGame("vert1");
                    } else if (holder == 9) {
                        endGame("vert3");
                    } else if (holder == 8) {
                        endGame("line3");
                    } else {
                        endGame("line1");
                    }
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 9 || holder == 1) {
                        endGame("diag1");
                    } else {
                        endGame("diag2");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }
        }
    }

    /**
     * This function handles the case where the user's first two moves are an edge square and one of the adjacent edge squares (i.e. 2 and 4)
     * 
     */
    function edgeMid() {
        if (caseLock == false) { // Only the first time this function is called
            caseLock = true;
            if (squares[secondMove - 1].name == squares[firstMove - 1].mid2) {
                holder = squares[firstMove - 1].adj1;
            } else {
                holder = squares[firstMove - 1].opp1;
            }
            $("[name=" + holder + "]").html("O").css({
                "color": "red",
                "cursor": "default"
            });
            squares[holder - 1].filled = true;
            turnCounter++;

            $("td").off();
            $("td").on("click", edgeMid);
        } else {
            if (squares[($(this).attr("name")) - 1].filled == false) {
                turnCounter++;
                squares[($(this).attr("name")) - 1].filled = true;
                $("td").css("color", "black");
                $(this).html("X").css("cursor", "default");
            }

            if (turnCounter == 5) {
                if ($(this).attr("name") == squares[holder - 1].pair) {
                    holder = squares[holder - 1].mid2;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 3 || holder == 7) {
                        endGame("diag2");
                    } else {
                        endGame("diag1");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 7) {
                if ($(this).attr("name") == squares[holder - 1].pair) {
                    holder = squares[holder - 1].opp2;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    holder = squares[holder - 1].pair;
                    $("[name=" + holder + "]").html("O");
                    if (holder == 1 || holder == 9) {
                        endGame("diag1");
                    } else {
                        endGame("diag2");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 9) {
                endGame("cats");
            }
        }
    }

    /**
     * This function handles the case where the user's first two moves are the center and cell 9
     * 
     */
    function midPair() {
        if (caseLock == false) { // Only the first time this function is called
            caseLock = true;
            if (secondMove == 3) {
                holder = 7;
                mirrorCheck = "cw";
            } else if (secondMove == 9) {
                holder = 3;
                mirrorCheck = "cw";
            } else {
                holder = 3;
            }
            $("[name=" + holder + "]").html("O").css({
                "color": "red",
                "cursor": "default"
            });
            squares[holder - 1].filled = true;
            turnCounter++;

            $("td").off();
            $("td").on("click", midPair);
        } else {
            if (squares[($(this).attr("name")) - 1].filled == false) {
                turnCounter++;
                squares[($(this).attr("name")) - 1].filled = true;
                $("td").css("color", "black");
                $(this).html("X").css("cursor", "default");
            }

            if (turnCounter == 5) {
                if (secondMove == 3 && $(this).attr("name") == 4) {
                    holder = 6;
                    $("[name=6]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else if (secondMove == 7 && $(this).attr("name") == 2) {
                    holder = 8;
                    $("[name=8]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else if (secondMove == 9 && $(this).attr("name") == 2) {
                    holder = 8;
                    $("[name=8]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    if (secondMove == 3) {
                        $("[name=4]").html("O");
                        endGame("vert1");
                    } else {
                        $("[name=2]").html("O");
                        endGame("line1");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 7) {
                if (secondMove == 3) {
                    if ($(this).attr("name") == 2) {
                        holder = 8;
                        $("[name=8]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    } else {
                        holder = 2;
                        $("[name=2]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    }
                } else if (secondMove == 7) {
                    if ($(this).attr("name") == 4) {
                        holder = 6;
                        $("[name=6]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    } else {
                        holder = 4;
                        $("[name=4]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    }
                } else {
                    if ($(this).attr("name") == 6) {
                        holder = 4;
                        $("[name=4]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    } else {
                        holder = 6;
                        $("[name=6]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 9) {
                endGame("cats");
            }
        }
    }

    /**
     * This function handles the case where the user's first two moves are the center and either cell 6 or 8
     * 
     */
    function midOpp() {
        if (caseLock == false) { // Only the first time this function is called
            caseLock = true;
            if (secondMove == 6) {
                holder = 4;
            } else {
                holder = 2;
            }
            $("[name=" + holder + "]").html("O").css({
                "color": "red",
                "cursor": "default"
            });
            squares[holder - 1].filled = true;
            turnCounter++;

            $("td").off();
            $("td").on("click", midOpp);
        } else {
            if (squares[($(this).attr("name")) - 1].filled == false) {
                turnCounter++;
                squares[($(this).attr("name")) - 1].filled = true;
                $("td").css("color", "black");
                $(this).html("X").css("cursor", "default");
            }

            if (turnCounter == 5) {
                if (secondMove == 6 && $(this).attr("name") == 7) {
                    holder = 3;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else if (secondMove == 8 && $(this).attr("name") == 3) {
                    holder = 7;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    if (secondMove == 6) {
                        $("[name=7]").html("O");
                        endGame("vert1");
                    } else {
                        $("[name=3]").html("O");
                        endGame("line1");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 7) {
                if (secondMove == 6 && $(this).attr("name") == 2) {
                    holder = 8;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else if (secondMove == 8 && $(this).attr("name") == 4) {
                    holder = 6;
                    $("[name=" + holder + "]").html("O").css({
                        "color": "red",
                        "cursor": "default"
                    });
                } else {
                    if (secondMove == 6) {
                        $("[name=2]").html("O");
                        endGame("line1");
                    } else {
                        $("[name=2]").html("O");
                        endGame("vert1");
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 9) {
                endGame("cats");
            }
        }
    }

    /**
     * This function handles the case where the user's first two moves are the center and either cell 2 or 4
     * 
     */
    function midAdj() {
        if (caseLock == false) { // Only the first time this function is called
            caseLock = true;
            if (secondMove == 2) {
                holder = 8;
            } else {
                holder = 6;
            }
            $("[name=" + holder + "]").html("O").css({
                "color": "red",
                "cursor": "default"
            });
            squares[holder - 1].filled = true;
            turnCounter++;

            $("td").off();
            $("td").on("click", midAdj);
        } else {
            if (squares[($(this).attr("name")) - 1].filled == false) {
                turnCounter++;
                squares[($(this).attr("name")) - 1].filled = true;
                $("td").css("color", "black");
                $(this).html("X").css("cursor", "default");
            }

            if (turnCounter == 5) {
                if (secondMove == 2) {
                    if ($(this).attr("name") == 4) {
                        holder = 6;
                    } else if ($(this).attr("name") == 6) {
                        holder = 4;
                    } else if ($(this).attr("name") == 7) {
                        holder = 3;
                    } else if ($(this).attr("name") == 3) {
                        holder = 7;
                        mirrorCheck = "3";
                    } else {
                        holder = 7;
                    }
                } else { // secondMove == 4
                    if ($(this).attr("name") == 2) {
                        holder = 8;
                    } else if ($(this).attr("name") == 3) {
                        holder = 7;
                    } else if ($(this).attr("name") == 8) {
                        holder = 2;
                    } else if ($(this).attr("name") == 7) {
                        holder = 3;
                        mirrorCheck = "7";
                    } else {
                        holder = 3;
                    }
                }
                $("[name=" + holder + "]").html("O").css({
                    "color": "red",
                    "cursor": "default"
                });
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 7) {
                if (secondMove == 2) {
                    if (holder == 6) { // M6 origin
                        if ($(this).attr("name") == 3) {
                            holder = 7;
                        } else {
                            holder = 3;
                        }
                        $("[name=" + holder + "]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    } else if (holder == 4) { // M3
                        if ($(this).attr("name") == 7) {
                            holder = 3;
                            $("[name=" + holder + "]").html("O").css({
                                "color": "red",
                                "cursor": "default"
                            });
                        } else {
                            $("[name=7]").html("O");
                            endGame("vert1");
                        }
                    } else if (holder == 3) { // M5 origin
                        if ($(this).attr("name") == 4) {
                            holder = 6;
                        } else {
                            holder = 4;
                        }
                        $("[name=" + holder + "]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    } else { //holder==7
                        if (mirrorCheck == "3") { // W2
                            if ($(this).attr("name") == 4) {
                                $("[name=9]").html("O");
                                endGame("line3");
                            } else {
                                $("[name=4]").html("O");
                                endGame("vert1");
                            }
                        } else { // M4
                            if ($(this).attr("name") == 4) {
                                holder = 6;
                                $("[name=" + holder + "]").html("O").css({
                                    "color": "red",
                                    "cursor": "default"
                                });
                            } else {
                                $("[name=4]").html("O");
                                endGame("vert1");
                            }
                        }
                    }
                } else { // secondMove==4
                    if (holder == 8) { // M6 origin
                        if ($(this).attr("name") == 3) {
                            holder = 7;
                        } else {
                            holder = 3;
                        }
                        $("[name=" + holder + "]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    } else if (holder == 7) { // M5 origin
                        if ($(this).attr("name") == 2) {
                            holder = 8;
                        } else {
                            holder = 2;
                        }
                        $("[name=" + holder + "]").html("O").css({
                            "color": "red",
                            "cursor": "default"
                        });
                    } else if (holder == 2) { // M3
                        if ($(this).attr("name") == 3) {
                            holder = 7;
                            $("[name=" + holder + "]").html("O").css({
                                "color": "red",
                                "cursor": "default"
                            });
                        } else {
                            $("[name=3]").html("O");
                            endGame("line1");
                        }
                    } else { //holder==3
                        if (mirrorCheck == "7") { // W2
                            if ($(this).attr("name") == 2) {
                                $("[name=9]").html("O");
                                endGame("vert3");
                            } else {
                                $("[name=2]").html("O");
                                endGame("line1");
                            }
                        } else { // M4
                            if ($(this).attr("name") == 2) {
                                holder = 8;
                                $("[name=" + holder + "]").html("O").css({
                                    "color": "red",
                                    "cursor": "default"
                                });
                            } else {
                                $("[name=2]").html("O");
                                endGame("line1");
                            }
                        }
                    }
                }
                squares[holder - 1].filled = true;
                turnCounter++;
            }

            if (turnCounter == 9) {
                endGame("cats");
            }
        }
    }
// -----------------------
// GAME CASE FUNCTIONS END
// -----------------------

    /**
     * This function handles the logic for the first two moves of the game, and sets many of the variables such as firstMove, firstType, secondMove, etc. It also determines based on the starting moves,
     * which game case the player has played, and calls the appropriate function. 
     */
    function firstPlays() {
        if (squares[($(this).attr("name")) - 1].filled == false) { // Prevents duplicate cell clicks
            turnCounter++;
            squares[($(this).attr("name")) - 1].filled = true;
            $("td").css("color", "black");
            $(this).html("X").css("cursor", "default");
        }

        if (turnCounter == 1) {
            firstMove = $(this).attr("name");
            firstType = squares[($(this).attr("name")) - 1].type;

            if ($(this).is(".corner")) {
                $("[name=5]").html("O").css({
                    "color": "red",
                    "cursor": "default"
                });
                squares[4].filled = true;
            } else if ($(this).is(".edge")) {
                $("[name=5]").html("O").css({
                    "color": "red",
                    "cursor": "default"
                });
                squares[4].filled = true;
            } else {
                $("[name=1]").html("O").css({
                    "color": "red",
                    "cursor": "default"
                });
                squares[0].filled = true;
            }
            turnCounter++;
        }

        if (turnCounter == 3) {
            secondMove = $(this).attr("name");
            if (firstMove == squares[($(this).attr("name")) - 1].pair && firstType == "C") {
                cornerPair();
            } else if (firstMove == squares[($(this).attr("name")) - 1].pair && firstType == "E") {
                edgePair();
            } else if ((firstMove == squares[($(this).attr("name")) - 1].adj1 || firstMove == squares[($(this).attr("name")) - 1].adj2)) {
                cornerAdj();
            } else if ((firstMove == squares[($(this).attr("name")) - 1].opp1 || firstMove == squares[($(this).attr("name")) - 1].opp2)) {
                cornerOpp();
            } else if (firstMove == squares[($(this).attr("name")) - 1].mid1 || firstMove == squares[($(this).attr("name")) - 1].mid2) {
                if (firstType == "C") {
                    cornerMid();
                } else {
                    edgeMid();
                }
            } else {
                if ($(this).attr("name") == 2 || $(this).attr("name") == 4) {
                    midAdj();
                } else if ($(this).attr("name") == 6 || $(this).attr("name") == 8) {
                    midOpp();
                } else {
                    midPair();
                }
            }
        }
    }

    /**
     * This function handles the end game conditions, displays a message with the game result.
     * @param {*} endCode represents the way the game ended. Allows the message to display which line won, or if there was a tie.
     */
    function endGame(endCode) {
        $("td").css("cursor", "default").off();
        $("#message").html("Game Over! <span id='endType'></span>").css("color", "red");
        $("#replay").css("visibility", "visible");
        switch (endCode) {
            case "line1":
                $("#endType").html("Lost to a line in row 1!");
                break;
            case "line2":
                $("#endType").html("Lost to a line in row 2!");
                break;
            case "line3":
                $("#endType").html("Lost to a line in row 3!");
                break;
            case "vert1":
                $("#endType").html("Lost to a line in column 1!");
                break;
            case "vert2":
                $("#endType").html("Lost to a line in column 2!");
                break;
            case "vert3":
                $("#endType").html("Lost to a line in column 3!");
                break;
            case "diag1":
            case "diag2":
                $("#endType").html("Lost to a diagonal line!");
                break;
            case "cats":
                $("#endType").html("It's a Tie!");
                break;
        }
    }

    // Set up event listeners
    $("td").on("click", firstPlays);

    $("#replay").on("click", function(){
        location.reload();
    })


















})