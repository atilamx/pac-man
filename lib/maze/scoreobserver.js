Window.Observer = (function(){
  var lifeBar = 5000;
  var notLaught = true;

  function clearLocks(){
    notLaught = true;
  }

  function checkIfnewLifeCanbeGranted(){
    if (window.globalConstants.score > lifeBar){
      lifesStorage.addLifes(1);
      Window.SoundEffects.addLife();
      lifeBar += 5000;
    }
  };

  function checkIftheCurrentGameSucks(){
    var completedPercentage = pillStorage.getPercentage();
     if (completedPercentage < 40 && lifesStorage.getKilles() >= 2 && notLaught){
       Window.SoundEffects.laugh();
       notLaught = false
     }

    if (completedPercentage > 80 && lifesStorage.getKilles() >= 3 && notLaught){
      Window.SoundEffects.laugh();
      notLaught = false
    }
  };

  function checkIfFruitShouldbeDisplay(){
    Window.fruitsController.drawFruit();
  };

  function checkIfweShouldVarySound(){
    var completedPercentage = pillStorage.getPercentage();

    if (completedPercentage > 90 && completedPercentage < 95 ){
       Window.SoundEffects.incrementBackgroundSoundVelocity(1.2)
    } else if (completedPercentage > 95 && completedPercentage < 100 ){
       Window.SoundEffects.incrementBackgroundSoundVelocity(2);
    }
  }

  function checkIfGamePaused(){
    Window.keyEventsObserver.getPauseStatus() ? Window.Texts.drawPause() : true;
  }

  function score(){
    checkIfnewLifeCanbeGranted();
    checkIftheCurrentGameSucks();
    checkIfFruitShouldbeDisplay();
    checkIfweShouldVarySound();
    checkIfGamePaused();
  };

  return {
    score: score,
    clear: clearLocks,
  }
})();

