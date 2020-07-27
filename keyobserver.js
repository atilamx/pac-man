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
    console.log("refreshing")    
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

      console.log("here")
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


  var setGestureEvent = function(){
    //find a better place for this call, I dont like it :( 
    //Make mobile work    
    $("#start_game_button").click(function() {
      console.log("Restarting the game");
      refreshPage();
    });

    var el = document.getElementById("canvas");

    el.addEventListener('touchstart', handleTouchStart, false);        
    el.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;                                                        
    var yDown = null;                                                        

    function handleTouchStart(evt) {        
      //xDown = evt.originalEvent.touches[0].clientX;   
      xDown = evt.touches[0].clientX;                                                                         
      yDown = evt.touches[0].clientY;                                      
    };                                                

    function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
        return;
      }

      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            processKeyPress('left');
        } else {
            /* right swipe */
            processKeyPress('right');
        }                       
      } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            processKeyPress('up');
        } else { 
            /* down swipe */
            processKeyPress('down');
        }                                                                 
      }
      /* reset values */
      xDown = null;
      yDown = null;                                             
      };
  };

  return {
    init: function(){
      setKeyEvents();
      //Only if mobile
      setGestureEvent();
    },
    register: function(obj){
      register(obj)
    },
    getPauseStatus: function(){
      return pause;
    }
  }
})();
