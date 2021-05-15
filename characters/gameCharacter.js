//This code is too ugly that im going to pretend that never existed at all shame on me :(

Window.GameCharacter = (function Character(){
  //Global options;
  var trackCoordinates,
    pacmanPreviusDirection = 'left',
    pacmanDirection = 'left',
    pacmanCurrentDirection = 'right',
    previusCoordinates = { x:254, y:388},
    cachedDirection = 'left',
    characterType = 'Pacman',
    characterName = '',
    ghostFrecuency = 0,
    Color = 'yellow',
    toggle = true,
    stuck = 'false',
    coordinatesStack = [],
    ghostChaseMode = false,
    HasBeenBitten = false,
    threeTimes = 0,
    vicibility = true,
    currentCoordinates = { x:254, y:388},
    dyePacman = false,
    shrinkAngle = 360;

  var eventList = {

    "pacman_power1": function(callback){
      var chaseMode = callback().chasemode;
      if(!HasBeenBitten){
        chaseMode ? ghostChaseMode = chaseMode : ghostChaseMode = false;
      }
    },

    "pacman_getghost": function(callback){
      vicibility = callback(characterType);
    },

    "pacmanIsDead": function(callback){

      characterType == "Ghost" ? inTheBlueBox = true : false;

      switch (characterName){
        case 'Inky':
          trackCoordinates.setCurrentCoordinates([200,220]);
          break;
        case 'Clyde':
          trackCoordinates.setCurrentCoordinates([280,220]);
          break;
        case 'Pinky':
          trackCoordinates.setCurrentCoordinates([280,250]);
          break;
        case 'Blinky':
          trackCoordinates.setCurrentCoordinates([200,250]);
          break;
        default:
          trackCoordinates.setCurrentCoordinates([254,388]);
      }

      //Reset pacman coordinates
      dyePacman = false;
      shrinkAngle = 360;
      pacmanPreviusDirection = 'left';
      pacmanDirection = 'left';
      previusCoordinates = { x:254, y:388};
      currentCoordinates = { x:254, y:388};
    },

    "goInvisible": function(callback){
      characterType == "Ghost" ? inTheBlueBox = true : false;
      switch (characterName){
        case 'Inky':
          trackCoordinates.setCurrentCoordinates([200,220]);
          break;
        case 'Clyde':
          trackCoordinates.setCurrentCoordinates([280,220]);
          break;
        case 'Pinky':
          trackCoordinates.setCurrentCoordinates([280,250]);
          break;
        case 'Blinky':
          trackCoordinates.setCurrentCoordinates([200,250]);
          break;
        default:
          trackCoordinates.setCurrentCoordinates([254,388]);
      }
      //Reset pacman coordinates
      dyePacman = false;
      shrinkAngle = 360;
      pacmanPreviusDirection = 'left';
      pacmanDirection = 'left';
      previusCoordinates = { x:254, y:388};
      currentCoordinates = { x:254, y:388};
    }
  };

  var inTheBlueBox = true;

  var eventHandler = function(event_id,callback){
    eventList[event_id](callback);
  };

  var grades = Pacman.mouthGrades;

  var storeLatestKeyEvent = function(direction){
    cachedDirection = direction;
  };

  var coordinates = function(){
    var xCoordinate = 0,
      yCoordinate = 0;
    var counter = 0;

    function init(homeX, homeY){
      if (homeX){
        xCoordinate = homeX;
      } else {
        xCoordinate = Window.myCanvas.centerX;
      }

      if (homeY){
        yCoordinate = homeY;
      } else {
        yCoordinate = Window.myCanvas.centerY;
      }
    }

    function increment(plane){
      if (plane === 'x'){
        return xCoordinate = xCoordinate + window.globalConstants.pacmanIncrementX;
      } else if (plane === 'y') {
        return yCoordinate = yCoordinate + window.globalConstants.pacmanIncrementY;
      }
    }

    function decrement(plane){
      if (plane === 'x'){
        return xCoordinate = xCoordinate - window.globalConstants.pacmanIncrementX;
      } else if (plane === 'y') {
        return yCoordinate = yCoordinate - window.globalConstants.pacmanIncrementY;
      }
    }

    function getCoordinates(plane){
      switch (plane){
        case 'x':
          return xCoordinate;
          break;
        case 'y':
          return yCoordinate;
          break
        default:
          return [xCoordinate, yCoordinate];
          break
      }
    }

    function setCoordinates(newCoordinates){
      xCoordinate = newCoordinates[0];
      yCoordinate = newCoordinates[1];
    }

    return {increment: increment, decrement: decrement, initialize: init, getCurrentCoordinates: getCoordinates,setCurrentCoordinates: setCoordinates }
  }

  var sketchCharacter = function(pcProperties){
    if (characterType == 'Pacman') {
      if(vicibility){
        shrinkAngle = Pacman.drawYellowPie('fill',pcProperties,dyePacman,shrinkAngle);
      } else {
        shrinkAngle = Pacman.drawYellowPie('delete',pcProperties,dyePacman,shrinkAngle);
        Pacman.drawMoneyEarned(pcProperties);
      }
    } else {
      pcProperties.fillColor = (ghostChaseMode ? Window.SoundEffects.getColorFromSoundPostion() : Color);
      var tmpObject = null;
      tmpObject = Ghost.drawGhost('delete', pcProperties, toggle, trackCoordinates, ghostFrecuency, ghostChaseMode,HasBeenBitten, inTheBlueBox,threeTimes, pacmanDirection);
      toggle         = tmpObject.toggle;
      HasBeenBitten  = tmpObject.HasBeenBitten;
      ghostFrecuency = tmpObject.ghostFrecuency;
      threeTimes     = tmpObject.threeTimes;

      tmpObject = Ghost.drawGhost('fill', pcProperties, toggle, trackCoordinates, ghostFrecuency, ghostChaseMode, HasBeenBitten,inTheBlueBox,threeTimes, pacmanDirection);
      toggle         = tmpObject.toggle;
      HasBeenBitten  = tmpObject.HasBeenBitten;
      ghostFrecuency = tmpObject.ghostFrecuency;
      threeTimes     = tmpObject.threeTimes;
    }

  }

  var contexts = {
    characterCoordinate: function(){ return trackCoordinates },
    characterDirection: function(){ return pacmanDirection },
    HasBeenBiten: function(){ return HasBeenBitten }
  };

  var mouthAngle = Pacman.mouth(contexts);

  var checkHotAreasOnWall =  function (direction, pacmanProperties, coordinate){
    var modulateVelocity = Window.GameCharacterVelocity.modulateVelocity;
    var allCoordinates = {
      dir: null,
      slowVelocity: window.globalConstants.slowVelocity,
      coordinate: coordinate,
      characterName: characterName,
      characterType: characterType,
      ghostChaseMode: ghostChaseMode,
      trackCoordinates: trackCoordinates,
      pacmanProperties: pacmanProperties,
      HasBeenBitten: HasBeenBitten
    };

    if (Window.Labyrinth.checkHotAreas(contexts).temperature){
      //This code gets triggered when pac-man is in a hot area
      //Apply previous direction in case that you are in a hot area.

      //Update the stuck status
      stuck = true;

      if(trackCoordinates.getCurrentCoordinates(coordinate) == previusCoordinates[coordinate] ){
        if(coordinate == 'x' && (pacmanPreviusDirection == 'up' || pacmanPreviusDirection == 'down') ) {
          pacmanDirection = pacmanPreviusDirection;
        } else if (coordinate == 'y' && (pacmanPreviusDirection == 'right' || pacmanPreviusDirection == 'left')) {
          pacmanDirection = pacmanPreviusDirection;
        }
      }

      if(cachedDirection != null){
        if (pacmanDirection == 'right' && Window.Labyrinth.checkHotAreas(contexts).hotDirection != 'right') {
          allCoordinates['dir'] = 'increment';
          allCoordinates['coordinate'] = 'x';
          pacmanProperties[allCoordinates['coordinate']] = modulateVelocity(allCoordinates);
        } else if (pacmanDirection == 'left' && Window.Labyrinth.checkHotAreas(contexts).hotDirection != 'left'){
          allCoordinates['dir'] = 'decrement';
          allCoordinates['coordinate'] = 'x';
          pacmanProperties[allCoordinates['coordinate']] = modulateVelocity(allCoordinates);
        }

        if (pacmanDirection == 'down' && Window.Labyrinth.checkHotAreas(contexts).hotDirection != 'down') {
          allCoordinates['dir'] = 'increment';
          allCoordinates['coordinate'] = 'y';
          pacmanProperties[allCoordinates['coordinate']] = modulateVelocity(allCoordinates);

        } else if (pacmanDirection == 'up' && Window.Labyrinth.checkHotAreas(contexts).hotDirection != 'up'){
          allCoordinates['dir'] = 'decrement';
          allCoordinates['coordinate'] = 'y';
          pacmanProperties[allCoordinates['coordinate']] = modulateVelocity(allCoordinates);
        }

        sketchCharacter(setCharacterProperties());
      }
      //Probably this else is conflictive keep an eye
      else {
        sketchCharacter(pacmanProperties);
      }
    } else {
      stuck = false;

      /*
       * This code is the one that increments decrements the character position
       */
      if (direction == 'right' || direction == 'down') {
        allCoordinates['dir'] = 'increment';
        pacmanProperties[coordinate] = modulateVelocity(allCoordinates);
      } else if (direction == 'left'|| direction == 'up'){
        allCoordinates['dir'] = 'decrement';
        pacmanProperties[coordinate] = modulateVelocity(allCoordinates);
      }

      sketchCharacter(pacmanProperties);
    }
  }

  var setCharacterProperties = function(){

    var tmpAngle = mouthAngle(pacmanDirection);

    var angles = grades.get(tmpAngle);

    var Properties = {};

    Properties.context          = Window.myCanvas.context;
    Properties.deleteRadius     = window.globalConstants.radius + 1;
    Properties.deleteStartAngle = angles.startAngle;
    Properties.deleteEndAngle   = angles.endAngle;
    Properties.counterClockwise = false;
    Properties.deleteX          = trackCoordinates.getCurrentCoordinates('x');
    Properties.deleteY          = trackCoordinates.getCurrentCoordinates('y');
    Properties.radius           = window.globalConstants.radius;
    Properties.startAngle       = angles.startAngle;
    Properties.endAngle         = angles.endAngle;
    Properties.x                = trackCoordinates.getCurrentCoordinates('x');
    Properties.y                = trackCoordinates.getCurrentCoordinates('y');
    Properties.eraseColor       = 'black';
    Properties.fillColor        = 'yellow';

    if(pacmanCurrentDirection != pacmanDirection){
      //Erase the pacman from 0 to 360 degres whenever there is a change of direction
      pacmanCurrentDirection = pacmanDirection;
      Properties.deleteStartAngle = 0; Properties.deleteEndAngle = 6.283185307;
    }

    return Properties;
  }

  var chosenDirection = function(direction, CharacterProperties){

    switch(direction){
      case String(direction.match(/right|left/)):
        checkHotAreasOnWall(direction, CharacterProperties, 'x');
        break;
      case String(direction.match(/down|up/)):
        checkHotAreasOnWall(direction, CharacterProperties, 'y');
        break;
    }
  }

  var draw = function(direction){
    if (characterType === "Pacman"){
      Pacman.EatPill(Window.Labyrinth.getPillCoordinates(),trackCoordinates);
    }

    chosenDirection(direction, setCharacterProperties());
  }

  var setDirection = function(direction){
    storeLatestKeyEvent(direction)

    if (direction != pacmanDirection) {

      pacmanPreviusDirection = pacmanDirection;
      previusCoordinates.x = currentCoordinates.x
      previusCoordinates.y = currentCoordinates.y

      currentCoordinates.x = trackCoordinates.getCurrentCoordinates()[0];
      currentCoordinates.y = trackCoordinates.getCurrentCoordinates()[1];
    }

    pacmanDirection = direction;
  }

  var lock = false;

  return {
    direction: function(dir){
      if (pacmanDirection == cachedDirection && pacmanCurrentDirection == cachedDirection){
        cachedDirection = null;
      } else {
        if (cachedDirection != null) {
          if (lock == true) {
            setDirection(cachedDirection);
            dir = cachedDirection;
            lock = false;
          } else {
            lock = true;
          }

        }
      }
      draw(dir)
    },

    init: function(homeX, homeY){
      trackCoordinates = coordinates();

      trackCoordinates.initialize(homeX, homeY);
    },

    getCoordinates: function(coordinate){
      return trackCoordinates.getCurrentCoordinates(coordinate)
    },

    setCoordinates: function(coordinate){
      return trackCoordinates.setCurrentCoordinates(coordinate)
    },

    storeCordinates: function(coordinate){
      //Reset the stack we need this to take samples
      //on the position of the ghosts and pacman
      if (coordinatesStack.length > 10){
        coordinatesStack = [];
      }

      coordinatesStack.push(coordinate);
    },

    getCordinatesStack: function(){
      return coordinatesStack;
    },

    setNewDirection: function(direction){
      if (cachedDirection != direction) {
        setDirection(direction);
      }
    },

    getCharacterDirection: function(){
      return pacmanDirection;
    },

    getPreviousCharacterDirection: function(){
      return pacmanPreviusDirection;
    },

    clone: function(){
      return new Character();
    },

    setcharacterType: function(setcharacterType,name,color){
      characterType = setcharacterType;
      Color = color;
      characterName = name;
    },

    getcharacterType: function(){
      return {
        Type: characterType,
        Name: characterName
      };
    },

    getStuckStatus: function(){
      return stuck;
    },

    isInsideHome: function(){
     return inTheBlueBox;
    },

    markAsOutOfTheBox: function(){
      inTheBlueBox = false;
    },

    eventCall: function(event_id,callback){
      eventHandler(event_id,callback);
    },

    getChaseMode: function(){
      return ghostChaseMode;
    },

    bitten: function(){
      if(characterType !== 'Pacman'){
        HasBeenBitten  = true;
        ghostChaseMode = false;
        Window.SoundEffects.ghostHasBeenEaten();
      } else if (!dyePacman && characterType === 'Pacman'){
        //Pacman has been bitten :(
        lifesStorage.removeLife();

        window.globalConstants.stopCharacters = true;

        //this variable will be responsible of the killing animation
        dyePacman = true;

        Window.SoundEffects.pacmanHasBeenEaten();
      }
    },

    isBitten: function(){
      return HasBeenBitten;
    }
  }
})();
