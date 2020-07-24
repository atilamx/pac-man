/*
 * This module is for handling the keyboard events
 * it currently detects the directions keys and the space and
 * enter key.
 */

Window.keyEventsObserver = (function(){
  var pause,
      observerList = [];

  function register(obj){
    observerList.push(obj)
  };

  function pauseTheWholeThing(){
    pause = window.globalConstants.stopCharacters = (pause ? false : true);
    Window.SoundEffects.pauseAll(pause);
    window.globalConstants.pause = pause;
  };

  function refreshPage(){
    location.reload(true);
  };

  function setDirectionToRegisterCharacters(direction){
    for (obj = 0; obj < observerList.length; obj++){
      observerList[obj].setNewDirection(direction);
    }
  };

  function processKeyPress(key){
   if(!pause){
      setDirectionToRegisterCharacters(key);
    }
  };

  var setKeyEvents = function(){
    document.onkeydown = function(event) {
      var keyCode = (event == null ? window.event.keyCode : event.keyCode);

      switch(keyCode){
        case 37:
          processKeyPress('left');
          break;
        case 38:
          processKeyPress('up');
          break;
        case 39:
          processKeyPress('right');
          break;
        case 40:
          processKeyPress('down');
          break;
        case 13:
          refreshPage();
          break;
        case 32:
          pauseTheWholeThing();
          break;
        default:
          break;
      }
    }
  };

  return {
    init: function(){
      setKeyEvents();
    },
    register: function(obj){
      register(obj)
    },
    getPauseStatus: function(){
      return pause;
    }
  }
})();
