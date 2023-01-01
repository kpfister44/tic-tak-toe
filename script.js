const Player = (name) => {
  /**
   * creates a player objecy that take a name as a parameter. It contains data attributes of:
   *  getName(string) = returns the name given as the parameter
   *  myTurn(boolean) = either true or false based on whether it is a player's turn during the
   *                    game. Initially set to true.
   */
  const getName = () => name;
  /**
   * returns the name of the player
   */
  let myTurn = true;
  return { getName, myTurn };
};

const gameBoard = (() => {
  let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let playerOne = Player("X");
  let playerTwo = Player("O");
  let displayNameOne;
  let displayNameTwo;
  let targetTile = null;
  let endGame = false;
  let winner = null;
  let totalTurns = 0;

  const hideDisplay = () => {
    /**
     * This method takes no arguments and toggles the inactive class on and off for the preGameDisplay and
     * the gameDisplay.
     */
    const pregameDisplay = document.querySelector(".pregame-display");
    const gameDisplay = document.querySelector(".gameboard");
    pregameDisplay.classList.toggle("inactive");
    gameDisplay.classList.toggle("inactive");
  };
  const displayBoard = () => {
    /**
     * this method takes no arguments and doesn't return anything. When called, it changes the
     * tic-tac-toe tiles display on the webpage to match the board array. The tic-tac-toe tiles
     * id # is its positioning in the board array.
     */
    for (let i = 0; i < 9; i++) {
      //iterary through the board array and display the index value to the matching div id
      const gameboardTile = document.getElementById(`${i}`);
      if (board[i] === "X" || board[i] === "O") {
        gameboardTile.innerHTML = board[i];
      }
    }
    const startGameButton = document.querySelector(".submit");
    const playerForm = document.querySelector("form");
    const playerTurnDisplay = document.querySelector(".player-turn-display");
    // add an event listener that calls hideDisplay function when the Lets Play button is clicked
    startGameButton.addEventListener("click", hideDisplay);
    // add an event listener that call and annoymous function which stores the player 1 and player 2 names from
    // the form and displays the names during the game
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const playersForm = e.target;
      displayNameOne = playersForm.playeronename.value;
      displayNameTwo = playersForm.playertwoname.value;
      playerTurnDisplay.innerHTML = `${displayNameOne}'s Turn`;
    });
  };
  const checkEndGame = () => {
    /**
     * This method takes no arguments and checks to see if the end game state has been reached during the
     * tic-tac-toe game.
     */
    // store the combination of winning conditions in a game of tic-tac-toe in an array
    const winningConditions = [
      board[0] + board[1] + board[2],
      board[0] + board[4] + board[8],
      board[0] + board[3] + board[6],
      board[1] + board[4] + board[7],
      board[2] + board[5] + board[8],
      board[2] + board[4] + board[6],
      board[3] + board[4] + board[5],
      board[6] + board[7] + board[8],
    ];
    for (let i of winningConditions) {
      if (i === "XXX") {
        endGame = true;
        winner = playerOne;
      } else if (i === "OOO") {
        endGame = true;
        winner = playerTwo;
      } else if (totalTurns === 9 && endGame == false) {
        endGame = true;
        winner = "tie";
      }
    }
  };

  const playerTurn = () => {
    /**
     * This method takes no parameters. It is called when a user clicks on one of the tic-tac-toe tiles. It checks
     * to see which player clicked the tile and updates the board array and calls the displayBoard method to reflect
     * the board array change on the display. It also calls the checkEndGame method, and if the Endgame has been reached,
     * displays the winner.
     */
    const playerTurnDisplay = document.querySelector(".player-turn-display");
    // update the totalTurns data attribute to keep track of how many turns have taken place
    totalTurns += 1;
    // check to see if its player 1's turn
    if (playerOne.myTurn === true) {
      // update the board array index value to "x" based on the id of the tic-tac-toe tile the player clicked on
      board[targetTile.id] = playerOne.getName();
      // call the displayBoard function to display the current board array
      displayBoard();
      playerOne.myTurn = false;
      playerTurnDisplay.innerHTML = `${displayNameTwo}'s Turn`;
    } else {
      // update the board array index value to "o" based on the id of the tic-tac-toe tile the player clicked on
      board[targetTile.id] = playerTwo.getName();
      // call the displayBoard function to display the current board array
      displayBoard();
      playerOne.myTurn = true;
      playerTurnDisplay.innerHTML = `${displayNameOne}'s Turn`;
    }
    // call the checkEndGame function to see if the endgame has been reached
    checkEndGame();
    // check to see if the game is over and player one won
    if (endGame === true && winner === playerOne) {
      const playerTurnDisplay = document.querySelector(".player-turn-display");
      playerTurnDisplay.innerHTML = `${displayNameOne} Wins`;
      const ticTacToeSquares =
        document.getElementsByClassName("gameboard-tile");
      for (square of ticTacToeSquares) {
        square.removeEventListener("click", gameBoard.playerTurn, {
          once: true,
        });
      }
      // check to see if the game is over and player two won
    } else if (endGame === true && winner === playerTwo) {
      playerTurnDisplay.innerHTML = `${displayNameTwo} Wins`;
      const ticTacToeSquares =
        document.getElementsByClassName("gameboard-tile");
      for (square of ticTacToeSquares) {
        square.removeEventListener("click", gameBoard.playerTurn, {
          once: true,
        });
      }
      // check to see if the game ended in a tie
    } else if (endGame === true && winner === "tie") {
      playerTurnDisplay.innerHTML = "Tie Game";
      const ticTacToeSquares =
        document.getElementsByClassName("gameboard-tile");
      for (square of ticTacToeSquares) {
        square.removeEventListener("click", gameBoard.playerTurn, {
          once: true,
        });
      }
    }
  };

  const restart = () => {
    /**
     * This method takes no arguments and resets all the data attributes to their original values. It also
     * resets the display to its original display.
     */
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    endGame = false;
    winner = null;
    targetTile = null;
    playerOne.myTurn = true;
    playerTwo.myTurn = false;
    totalTurns = 0;
    for (let i = 0; i < 9; i++) {
      const gameboardTile = document.getElementById(`${i}`);
      gameboardTile.innerHTML = "";
    }
    playGame();
    // change the player turn display so that the name of player 1 is shown
    const playerTurnDisplay = document.querySelector(".player-turn-display");
    playerTurnDisplay.innerHTML = `${displayNameOne}'s Turn`;
  };

  const playGame = () => {
    /**
     * This method takes no arguments and starts the tic-tac-toe game for the user. It calls
     * the displayBoard method and adds eventlisteners to the tiles. It also adds the event 
     * listener to the restart button.
     */
    displayBoard();
    const ticTacToeSquares = document.getElementsByClassName("gameboard-tile");
    for (square of ticTacToeSquares) {
      square.addEventListener("click", (e) => {
        targetTile = e.target;
      });
      square.addEventListener("click", playerTurn, { once: true });
    }
    const restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener("click", restart, { once: true });
  };
  return {
    playGame,
  };
})();
gameBoard.playGame();
