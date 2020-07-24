Window.GameCharacterVelocity = (function Character(){
  var obj         = null,
      slowRate    = null,
      atomicFlags = {
        Inky:   0,
        Clyde:  0,
        Blinky: 0,
        Blinky: 0
      };

  var stepBystep = function(chasing){
   /*
    * this does the effect of [move|stop],
    * if in chase mode flip the logic and rate on how to stop and move
    */
    if (atomicFlags[obj.characterName] < slowRate){
      atomicFlags[obj.characterName] += 1;
      return (chasing ?  static() : move());
    } else {
      atomicFlags[obj.characterName] = 0;
      return (chasing ? move() : static());
    }
  }

  var move = function(){
    return (obj.dir === 'increment' ? obj.trackCoordinates.increment(obj.coordinate) : obj.trackCoordinates.decrement(obj.coordinate));
  }

  var static = function(){
    return obj.pacmanProperties[obj.coordinate];
  }

  var slowMotion = function(){
    var chasing = null;
   /*
    * if ghost in chase mode
    */
    if (obj.ghostChaseMode && obj.characterType !== 'Pacman' || obj.ghostChaseMode && obj.slowVelocity > 20) {
      chasing = true

      return stepBystep(chasing)
    }
    /*
     * if Ghost and Ghost has not beein bitten
     */
    if (obj.characterType !== 'Pacman' && !obj.HasBeenBitten){
      /*
       * slowrate controls the velocity of the ghost in normal mode here 20 means
       * run move() 20 times and stop 1 time it gives the effect of having pacman
       * running more faster than the ghosts
       */
      chasing = false;
      if (obj.characterName == "Blinky"){
        slowRate = 1000;
      } else {
        slowRate = window.globalConstants.slowRateGhost;
      }

      return stepBystep(chasing);
    } else {
      return move();
    }
  }

  var characterVelocity = function(object){
    obj = object;
    slowRate = obj.slowVelocity || 2;

   /*
    *if game is just starting stop characters
    */
    return Window.SoundEffects.startGameSound().playing || window.globalConstants.stopCharacters ? static() : slowMotion();
  }

  return {
    modulateVelocity : characterVelocity
  }
})();
