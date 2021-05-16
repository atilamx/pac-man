Window.SquareEngine = function SquareEngine(characters){
  this.counter         = 0;
  this.ghostSteps      = 0;
  this.Characters      = characters;
  this.stackDirections = [];



  this.newDirection = function(index) {
    var ghost  = this.Characters[index],
      pacman = this.Characters[4];
  }
};

Window.SquareEngine.prototype = new Window.Engine;
