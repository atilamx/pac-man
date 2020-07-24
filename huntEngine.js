Window.HuntEngine = function HuntEngine(characters){
  this.counter         = 0;
  this.ghostSteps      = 0;
  this.Characters      = characters;
  this.stackDirections = [];
  this.rightupCorner   = [442, 38];
  this.leftupCorner    = [38, 38];
  this.leftBottCorner  = [38, 482];
  this.rightBottCorner = [442, 482];
  this.ghostHouse      = [220, 230]; //This is where the ghost is going to go once it has been bitten home

  this.characterTarget = function(ghost,pacman,plane){
    var xCoor = 0,
        yCoor = 1,
        xDiff = null,
        yDiff = null,
        chmod = ghost.getChaseMode(),
        Gcoor = ghost.getCoordinates(),
        PCoor = pacman.getCoordinates(),
        ghostCorners = {
          Inky: {
            xdiff: (this.rightupCorner[xCoor] - Gcoor[xCoor]),
            ydiff: (this.rightupCorner[yCoor] - Gcoor[yCoor]),
           },
          Clyde:  {
            xdiff: (this.leftupCorner[xCoor] - Gcoor[xCoor]),
            ydiff: (this.leftupCorner[yCoor] - Gcoor[yCoor]),
          },
          Blinky: {
            xdiff: (this.leftBottCorner[xCoor] - Gcoor[xCoor]),
            ydiff: (this.leftBottCorner[yCoor] - Gcoor[yCoor]),
          },
          Pinky: {
            xdiff: (this.rightBottCorner[xCoor] - Gcoor[xCoor]),
            ydiff: (this.rightBottCorner[yCoor] - Gcoor[yCoor]),
          },
        };

    if(chmod){
      xDiff = ghostCorners[ghost.getcharacterType().Name].xdiff;
      yDiff = ghostCorners[ghost.getcharacterType().Name].ydiff;
    } else {
      xDiff = (PCoor[xCoor] - Gcoor[xCoor]);
      yDiff = (PCoor[yCoor] - Gcoor[yCoor]);
    }

    if(ghost.isBitten()){
      xDiff = this.ghostHouse[xCoor] - Gcoor[xCoor];
      yDiff = this.ghostHouse[yCoor] - Gcoor[yCoor];
    }

    return (plane === 'x' ? xDiff : yDiff);
  };

  this.calculatePacmanTrayectory = function(ghost,pacman){
    var xDiff = this.characterTarget(ghost,pacman,'x'),
        yDiff = this.characterTarget(ghost,pacman,'y');

    if(Math.abs(xDiff) > Math.abs(yDiff)){
      if(Math.sign(xDiff) == -1){
        this.stackDirections.push("left")
        return "left";
      } else {
        this.stackDirections.push("right")
        return "right";
      }
    } else {
      if(Math.sign(yDiff) == -1){
        this.stackDirections.push("up")
        return "up";
      } else{
        this.stackDirections.push("down")
        return "down";
      }
    }
  }

  this.newDirection = function(index) {
    var ghost  = this.Characters[index],
        pacman = this.Characters[4];

    //If the character gets stuck in front of a wall at least N times
    if(ghost.getStuckStatus() && this.counter > 2){
      var charDirection         = ghost.getCharacterDirection(),
          charPreviousDirection = ghost.getPreviousCharacterDirection(),
          ranDirection          = this.compareDirections(charDirection,charPreviousDirection,ghost);

      ghost.setNewDirection(ranDirection);

      this.counter = 0;
    } else {
      if(ghost.getStuckStatus() && (charPreviousDirection == charDirection)){
        //Increment the counter only if the current direction is the same as the previous one and if the character is stuck!
        this.counter++;
      }

      //How many steps before triggering a chasing behaviour in the ghost
      if(this.ghostSteps > 50){
        this.ghostSteps = 0;

        ghost.setNewDirection(this.calculatePacmanTrayectory(ghost, pacman));
      }

    }

    this.ghostSteps++;
  }
};

Window.HuntEngine.prototype = new Window.Engine;
