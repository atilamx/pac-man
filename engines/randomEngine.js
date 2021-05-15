Window.RandomEngine = function RandomEngine(characters){
  this.Characters = characters;
  this.counter = 0;

  this.newDirection = function(index){
    /*From this point on you can get the name and type of character
     *this.Characters[3].getcharacterType()
     *this.Characters[2].getCharacterDirection()
     *
     */
    var ghost = this.Characters[index];

    if(ghost.getStuckStatus()){
      var charDirection         = ghost.getCharacterDirection(),
          charPreviousDirection = ghost.getPreviousCharacterDirection(),
          ranDirection          = this.compareDirections(charDirection,charPreviousDirection,ghost);

      ghost.setNewDirection(ranDirection);
    }
    else {
      if (this.counter > this.getRandomNumber(5000)) {
        ghost.setNewDirection(this.getRandomDirection(1,4));
        this.counter = 0;
      }
      else {
        this.counter++;
      }
    }
  }
};

//The Egine is the base class
Window.RandomEngine.prototype = new Window.Engine;
