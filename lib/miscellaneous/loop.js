Window.Mainloop = (function(){
  var characterArray = [];
  var context =  Window.myCanvas.context;
  function askMegamindForDirections(){
    Window.megaMind.getMeDirection()
  }
  function checkWarState(){
    Window.megaMind.checkPositionOfCharactes()
  }
  function setCharacterDirections(){
    /*
     * don't draw the characters if the game is over or there is a new level
     */
    if(!window.globalConstants.gameOver && !window.globalConstants.newLevel){
      var index = characterArray.length;

      for(var i = 0 ; i < index; i++ ){
        /*
         *Set the direction inside the character
         * This will not make the character to move in that direction is just a flag.
         */
        characterArray[i].direction(characterArray[i].getCharacterDirection());
      }
    }
    //Game over text
  }

  function clearAllShit(){
   if(!window.globalConstants.gameOver) {
     if (!window.globalConstants.stopCharacters) {
       context.beginPath();
       context.fillStyle = 'black';
       context.fillRect(0, 0, 490, 600);
     }
   }
  }

  return {
    //Make this function smaller we need to collapse the code more
    run: function(){
      //Run every time that the clock is ticking
      //This will set the intended direction where the character is goin to go in that direction
      askMegamindForDirections();

      clearAllShit();

      //Draw the middle square in the back
      Window.Labyrinth.backReDraw();

      setCharacterDirections();

      checkWarState();

      //Draw the rest of the maze
      Window.Labyrinth.squetchWalls()

      //Score
      Window.Texts.drawScore();

      //Lifes
      Window.Texts.drawLifes();

      //Draw Level
      Window.Texts.drawLevel();

      //Draw pills
      Window.Labyrinth.addPills();

      //Observe Scores
      Window.Observer.score();

      //Print left Screen
      Window.leftCanvas.printScreen();
      Window.rightCanvas.printScreen();
    },

    setupPlaneCoordinates: function(){
      var initalCoordinates = window.globalConstants.CharactersCoordinates;

      for(var i = 0 ; i < characterArray.length; i++ ){
        characterArray[i].init(initalCoordinates[i][0], initalCoordinates[i][1]);
      }
      //external blue wall
      Window.Labyrinth.init()
    },

    createCharacters: function(){
      var ghosts = [['Ghost','Inky','cyan'], ['Ghost','Clyde','orange'], ['Ghost','Pinky','pink'], ['Ghost','Blinky','red']];
      //Push the Ghosts
      for (var index = 0; index < ghosts.length; index++){
        var tmpGhost = Window.GameCharacter.clone(),
          type = ghosts[index][0],
          name = ghosts[index][1],
          color = ghosts[index][2];

        tmpGhost.setcharacterType(type, name, color);
        characterArray.push(tmpGhost);
      }
      //Push Pacman
      characterArray.push(Window.GameCharacter);
    },

    registerCharacters: function(){
      for (var index = 0; index < characterArray.length; index++) {
       /*
        * Which character is going to be control by the keyboard
        */
        if (window.globalConstants.characterKeyboardControl == characterArray[index].getcharacterType().Type){
          Window.keyEventsObserver.register(characterArray[index]);
        }

       /*
        * Register the Ghost with Megamind he is the one who will control the ghosts
        */
        Window.megaMind.registerCharacter(characterArray[index]);

       /*
        * Register each Ghost in the eventsObserver
        * Good for when the chasing behavior is triggered
        */
        Window.EventsObserver.register(characterArray[index]);
      }
    },

    registerEngines: function(){
      Window.megaMind.registerEngines(window.globalConstants.Engines);
    }
  }
})();
