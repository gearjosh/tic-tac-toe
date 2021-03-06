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
  console.log(inputCoords);
  Object.keys(this).forEach(function(key) {
    //this[key] = square
    var square = this[key];
    var location = this[key].position;
    var owner = this[key].ownership;
    if ((JSON.stringify(location) === JSON.stringify(inputCoords)) && (owner == "unclaimed")) {
      this[key].ownership = mark;
      gameObject.storedClaims[this[key].storedIndex] = mark;
      innerValidator = true;
      gameObject.turnTaker();
    } else if ((JSON.stringify(location) === JSON.stringify(inputCoords)) && owner != "unclaimed") {
      $("#"+inputCoords.join("")).addClass("shake-horizontal");
      setTimeout(function() {
       $("#"+inputCoords.join("")).removeClass("shake-horizontal");
     }, 350);
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
  var result = "false";
  console.log(checker.join(""))
  if ((checker[0] === checker[1] && checker[0] === checker[2])
   || (checker[3] === checker[4] && checker[3] === checker[5])
    || (checker[6] === checker[7] && checker[6] === checker[8])
     || (checker[0] === checker[3] && checker[0] === checker[6])
      || (checker[2] === checker[5] && checker[2] === checker[8])
       || (checker[1] === checker[4] && checker[1] === checker[7])
        || (checker[0] === checker[4] && checker[0] === checker[8])
         || (checker[2] === checker[4] && checker[2] === checker[6])) {
           result = "true";
           console.log(result)
           return result;
  } else if (/[XO]{9}/g.test(checker.join(""))) {
    result = "tie";
    console.log(result)
    return result;
 }
}
// Game Logic (public class?)
var newGame;
var newBoard;
var xWav = new Audio('wav/X.wav');
var oWav = new Audio('wav/O.wav');
var dontDoIt = new Audio('wav/bleep_05.wav');

function startGame() {
  newGame = new Game();
  newGame.playerLoad();

  newBoard = new Board();
}

// Interface Logic

$(function () {
  $(".gamesquare").click(function() {
    var squareSelected = $(this).attr('id');
    var arrayedInput = arrayCoords(squareSelected);
    // Refactor to function, should maintain with newGame global
    if (newGame.activePlayer == "player1") {
      var validator = newBoard.markSquare(arrayedInput, newGame.players[0], newGame);
      if (validator == true) {
        $(this).text("X");
        xWav.play();
      } else {
        dontDoIt.play();
      }

    } else if (newGame.activePlayer == "player2") {
      var validator = newBoard.markSquare(arrayedInput, newGame.players[1], newGame);
      if (validator == true) {
        $(this).addClass("o-class");
        $(this).text("O");
        oWav.play();
      } else {
        dontDoIt.play();
      }
    }

    var isItAWin = newGame.testForWin();

    if (isItAWin == "true" && newGame.activePlayer == "player2") {
      $('.gamesquare').addClass("game-over");
      $('.win-screen').show();
      $('#winner').text("Player 1 won!");
    }
    else if (isItAWin == "true" && newGame.activePlayer == "player1") {
      $('.gamesquare').addClass("game-over");
      $('.win-screen').show();
      $('#winner').text("Player 2 won");
    }
    else if (isItAWin == "tie") {
      $('.gamesquare').addClass("game-over");
      $('.win-screen').show();
      $('#winner').text("The only way to win is not to play.");
    }
  });

  $("#new-game").click(function() {
    $(".game-board").show();
    startGame();
    $(".gamesquare").empty();
    $(".gamesquare").removeClass("game-over");
    $("#winner").empty();
    $("#oneD").show();
    $("#play-assist").show();
  });

  $("#oneD").click(function() {
    var divKiller = $(".row1").contents();
    $(".row1").replaceWith(divKiller);
    var divKiller = $(".row2").contents();
    $(".row2").replaceWith(divKiller);
    var divKiller = $(".row3").contents();
    $(".row3").replaceWith(divKiller);
    $("#game-row").addClass("oneD-mode")
    $("#game-container").addClass("oneD-mode")
  })

  $("#play-assist").click(function() {
    var randomX = Math.floor(Math.random() * 2.999999999);
    var randomY = Math.floor(Math.random() * 2.999999999);
    var randomCoords = [];

    randomCoords.push(randomX, randomY);
    console.log(randomX, randomY, randomCoords);

    if (newGame.activePlayer == "player1") {
      var validator = newBoard.markSquare(randomCoords, newGame.players[0], newGame);
      if (validator == true) {
        $("#"+randomCoords.join("")).text("X");
        xWav.play();
      } else {
        dontDoIt.play();
      }
    } else if (newGame.activePlayer == "player2") {
      var validator = newBoard.markSquare(randomCoords, newGame.players[1], newGame);
      if (validator == true) {
        $("#"+randomCoords.join("")).addClass("o-class");
        $("#"+randomCoords.join("")).text("O");
        oWav.play();
      } else {
        dontDoIt.play();
      }
    }

      var isItAWin = newGame.testForWin();

      if (isItAWin == "true" && newGame.activePlayer == "player2") {
        $('.gamesquare').addClass("game-over");
        $('.win-screen').show();
        $('#winner').text("Player 1 won!");
      }
      else if (isItAWin == "true" && newGame.activePlayer == "player1") {
        $('.gamesquare').addClass("game-over");
        $('.win-screen').show();
        $('#winner').text("Player 2 won");
      }
      else if (isItAWin == "tie") {
        $('.gamesquare').addClass("game-over");
        $('.win-screen').show();
        $('#winner').text("The only way to win is not to play.");
      }
  });
});
