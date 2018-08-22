function Player(){
  this.playerName = "";
  this.mark = "";
}

function Game() {
  this.players = [];
  this.activePlayer = "player1"
}

function Board() {
  this.square1 = {
    position : [0,0],
    ownership : "unclaimed"
  };
  this.square2 = {
    position : [0,1],
    ownership : "unclaimed"
  };
  this.square3 = {
    position : [0,2],
    ownership : "unclaimed"
  };
  this.square4 = {
    position : [1,0],
    ownership : "unclaimed"
  };
  this.square5 = {
    position : [1,1],
    ownership : "unclaimed"
  };
  this.square6 = {
      position : [1,2],
      ownership : "unclaimed"
  };
  this.square7 = {
    position : [2,0],
    ownership : "unclaimed"
  };
  this.square8 = {
      position : [2,1],
      ownership : "unclaimed"
  };
  this.square9 = {
      position : [2,2],
      ownership : "unclaimed"
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

Board.prototype.markSquare = function(array, playerObject, gameObject) {
  var inputCoords = array;
  var mark = playerObject.mark;



  Object.keys(this).forEach(function(key) {
    console.log(this[key]);
    var square = this[key];
    var location = this[key].position;
    var owner = this[key].ownership;
    if ((JSON.stringify(location) === JSON.stringify(inputCoords)) && (owner == "unclaimed")) {
      this[key].ownership = mark;
      console.log("branch hit");
      gameObject.turnTaker();
    } else if ((JSON.stringify(location) === JSON.stringify(inputCoords)) && owner != "unclaimed") {
      alert("Square Claimed");
    }
  }.bind(this));

  // this.entries()forEach(function(value) {
  //   console.log("looping");
    // var location = this.position;
    // var owner = this.ownership;
    // if (location == inputCoords && owner != "unclaimed") {
    //   this.ownership = mark;
    //   console.log("branch hit");
  //   }
  // }
}

  // console.log(methodBoard)
  // if (mark == "X") {
  //   console.log(square);
  //   return "HIT";
  // } else {
  //   square.ownership = "player2";
  //   console.log(square);
  // }
// };

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
    var arrayedInput = arrayCoords(squareSelected);
    if (newGame.activePlayer == "player1") {
      newBoard.markSquare(arrayedInput, newGame.players[0], newGame);
    } else if (newGame.activePlayer == "player2") {
      newBoard.markSquare(arrayedInput, newGame.players[1], newGame);
    }
    console.log(newBoard)
  });
});
