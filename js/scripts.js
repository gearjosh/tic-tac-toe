function Player(){
  this.playerName = "";
  this.mark = "";
}

function Game() {
  this.players = [];
  this.activePlayer = "player1"
}

function Board() {
  this.row1 = {
    square1 : {
      position : [0,0],
      ownership : "unclaimed"
    },
    square2 : {
      position : [0,1],
      ownership : "unclaimed"
    },
    square3 : {
      position : [0,2],
      ownership : "unclaimed"
    }
  },
  this.row2 = {
    square1 : {
      position : [1,0],
      ownership : "unclaimed"
    },
    square2 : {
    position : [1,1],
    ownership : "unclaimed"
    },
    square3 : {
      position : [1,2],
      ownership : "unclaimed"
    }
  },
  this.row3 = {
    square1 : {
    position : [2,0],
    ownership : "unclaimed"
  },
    square2 : {
      position : [2,1],
      ownership : "unclaimed"
    },
    square3 : {
      position : [2,2],
      ownership : "unclaimed"
    }
  };
};

Game.prototype.playerLoad = function() {
  var player1 = new Player();
  var player2 = new Player();

  this.players.push(player1);
  this.players.push(player2);

  var playerCount = 1;

  this.players.forEach(function(playerObject) {
    playerObject.playerName = "player" + playerCount;
    if (playerCount === 1) {
      playerObject.mark = "X";
    }
    else {
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
  console.log(currentPlayer);
};

Board.prototype.markSquare = function(square, playerObject) {
  var position = square.position;
  var mark = playerObject.mark;
  if (mark == "X") {
    square.ownership = "player1";
    console.log(square);
    return "HIT";
  } else {
    square.ownership = "player2";
    console.log(square);
  }
};

function arrayCoords(id) {
  var coordinates = id.split("")
  var coordinates = coordinates.map(function(value) {
    return parseInt(value);
  })
  return coordinates;
};




//Game Logic Begins
var newGame = new Game();
newGame.playerLoad();

var newBoard = new Board();



$(function () {
  $(".gamesquare").click(function() {
    var squareSelected = $(this).attr('id');
    console.log(squareSelected);
    var arrayedInput = arrayCoords(squareSelected);
    var loggedMark = newBoard.markSquare(arrayedInput, newGame.players[0]);
    console.log(loggedMark)

    newGame.turnTaker();
  });
});
