function Player(){
  this.playerNumber = NaN;
  this.mark = "";
}

function Game() {
  this.players = [];
}

Game.prototype.playerLoad = function() {
  var player1 = new Player();
  var player2 = new Player();

  this.players.push(player1);
  this.players.push(player2);

  var playerCount = 1;

  this.players.forEach(function(playerObject) {
    playerObject.playerNumber = playerCount;
    if (playerCount === 1) {
      playerObject.mark = "X";
    }
    else {
      playerObject.mark = "O";
    }
    playerCount++;
  });
}

var newGame = new Game();

newGame.playerLoad();

console.log(newGame)
