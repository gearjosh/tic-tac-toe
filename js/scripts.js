function Player(){
  this.playerName = "";
  this.mark = "";
}

function Game() {
  this.players = [];
  this.activePlayer = "player1";
  this.storedClaims = ["a","b","c","d","e","f","g","h","i"];
}

function Board() {
  this.square1 = {
    position : [0,0],
    ownership : "unclaimed",
    storedIndex : 0
  };
  this.square2 = {
    position : [0,1],
    ownership : "unclaimed",
    storedIndex : 1
  };
  this.square3 = {
    position : [0,2],
    ownership : "unclaimed",
    storedIndex: 2
  };
  this.square4 = {
    position : [1,0],
    ownership : "unclaimed",
    storedIndex: 3
  };
  this.square5 = {
    position : [1,1],
    ownership : "unclaimed",
    storedIndex: 4
  };
  this.square6 = {
      position : [1,2],
      ownership : "unclaimed",
      storedIndex: 5
  };
  this.square7 = {
    position : [2,0],
    ownership : "unclaimed",
    storedIndex: 6
  };
  this.square8 = {
      position : [2,1],
      ownership : "unclaimed",
      storedIndex: 7
  };
  this.square9 = {
      position : [2,2],
      ownership : "unclaimed",
      storedIndex: 8
  };
};

Game.prototype.playerLoad = function() {
  var player1 = new Player();
  var player2 = new Player();
  var playerCount = 1;

  this.players.push(player1);
  this.players.push(player2);

  this.players.forEach(function(playerObject) {
    playerObject.playerName = "player" + playerCount;
    if (playerCount === 1) {
      playerObject.mark = "X";
    } else {
      playerObject.mark = "O";
    }
    playerCount++;
  });
}

Game.prototype.turnTaker = function() {
  var currentPlayer = this.activePlayer;
  if (currentPlayer == "player1") {
    this.activePlayer = this.players[1].playerName;
  } else {
    this.activePlayer = this.players[0].playerName;
  }
};
// Add jQuery alert v
Board.prototype.markSquare = function(array, playerObject, gameObject) {
  var inputCoords = array;
  var mark = playerObject.mark;
  var innerValidator = false;

  Object.keys(this).forEach(function(key) {
    var square = this[key];
    var location = this[key].position;
    var owner = this[key].ownership;
    if ((JSON.stringify(location) === JSON.stringify(inputCoords)) && (owner == "unclaimed")) {
      this[key].ownership = mark;
      gameObject.storedClaims[this[key].storedIndex] = mark;
      innerValidator = true;
      gameObject.turnTaker();
    } else if ((JSON.stringify(location) === JSON.stringify(inputCoords)) && owner != "unclaimed") {
      alert("Square Claimed"); //<-- use jQuery
    }
  }.bind(this));
  return innerValidator;
}

function arrayCoords(id) {
  var coordinates = id.split("");
  coordinates = coordinates.map(function(value) {
    return parseInt(value);
  })
  return coordinates;
};

Game.prototype.testForWin = function() {
  var checker = this.storedClaims

  if ((checker[0] === checker[1] && checker[0] === checker[2])
   || (checker[3] === checker[4] && checker[3] === checker[5])
    || (checker[6] === checker[7] && checker[6] === checker[8])
     || (checker[0] === checker[3] && checker[0] === checker[6])
      || (checker[2] === checker[5] && checker[2] === checker[8])
       || (checker[1] === checker[4] && checker[1] === checker[7])
        || (checker[0] === checker[4] && checker[0] === checker[8])
         || (checker[2] === checker[4] && checker[2] === checker[6])) {
           return true;
         }
}
// Game Logic (public class?)
var newGame;
var newBoard;
var xWav = new Audio('wav/X.wav');
var oWav = new Audio('wav/O.wav');

// function startGame() {
  newGame = new Game();
  newGame.playerLoad();

  newBoard = new Board();
// }

// Interface Logic

$(function () {
  $(".gamesquare").click(function() {
    var squareSelected = $(this).attr('id');
    var arrayedInput = arrayCoords(squareSelected);
    // Refactor to function, should maintain with newGame global
    if (newGame.activePlayer == "player1") {
      var validator = newBoard.markSquare(arrayedInput, newGame.players[0], newGame);

      if (validator === true) {
        $(this).text("X");
        xWav.play();
      }
    } else if (newGame.activePlayer == "player2") {
      var validator = newBoard.markSquare(arrayedInput,

      newGame.players[1], newGame);
      if (validator === true) {
        $(this).addClass("o-class");
        $(this).text("O");
        oWav.play();
      }
    }

    var isItAWin = newGame.testForWin();

    if (isItAWin === true && newGame.activePlayer == "player2") {
      $('.gamesquare').addClass("game-over");
      $('.win-screen').show();
      $('#winner').prepend("Player 1");
    }
    else if (isItAWin === true && newGame.activePlayer == "player1") {
      $('.gamesquare').addClass("game-over");
      $('.win-screen').show();
      $('#winner').prepend("Player 2");
    }
  });
});
