Window.megaMind = (function(){
  var Engines    = [],
      Characters = [],
      quantumRandomize = 0;

  var charactersQuantumTable = [
    {id:0,quantumStart:100,quantumEnd:3000,quantumCount:0},/* aggresive ones */
    {id:1,quantumStart:100,quantumEnd:3000,quantumCount:0},/* aggresive ones */
    {id:2,quantumStart:100,quantumEnd:3000,quantumCount:0},/* aggresive ones */
    {id:3,quantumStart:100,quantumEnd:3000,quantumCount:0},/* aggresive ones */

    //{id:2,quantumStart:1000,quantumEnd:1040,quantumCount:0},
    //{id:3,quantumStart:2000,quantumEnd:2020,quantumCount:0} //BEFORE


    //{id:2,quantumStart:400,quantumEnd:3000,quantumCount:0},
    //{id:3,quantumStart:20,quantumEnd:6000,quantumCount:0}
  ];

  function setDirectionOnEachCharacter(){
    //The last character is pacman
    for(var i =0; i < Characters.length - 1; i++){
      //Set direction by Character
      newDirection(i);
    }
  }

  function monitorEachCharater(){
    for(var i =0; i < Characters.length ; i++){
      monitorCaracterCoordinate(i);
    }
  }

  function monitorCaracterCoordinate(characterIndex){
    var leftTunnel    = [-14, 230],
        rightTunnel   = [494, 230],
        leftTunnelX   = leftTunnel[0],
        rightTunnelX  = rightTunnel[0],
        CharacterNum  = Characters[characterIndex],
        CharacterXcor = CharacterNum.getCoordinates()[0],
        CharacterDir  = CharacterNum.getCharacterDirection();

    if(CharacterXcor >= rightTunnelX && CharacterDir === "right"){
      CharacterNum.setCoordinates(leftTunnel);
    } else if(CharacterXcor <= leftTunnelX && CharacterDir === "left"){
      CharacterNum.setCoordinates(rightTunnel);
    }
  };

  function getRandomInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function randomizeCharactersQuantumTable(){
    var tmpIndex    = 0,
        tmpArray    = [],
        tmpObject   = '',
        arraysEqual = false,
        charactersQuantumTableCache = charactersQuantumTable.slice(0);

    do {
      for (var i = 3; i >= 0; i--) {
        /*try to get a random interval */
        do {
          (tmpIndex = getRandomInterval(0, i)) != i
        } while (tmpIndex === i && (tmpIndex !== 0 && i !== 0));

        tmpObject = charactersQuantumTable.splice(tmpIndex, 1);
        tmpArray.push(tmpObject.shift());
      }

      /*swap the last element*/
      var tmpIndex2  = tmpArray[3],
          tmpIndex3  = tmpArray[0];

      tmpArray[0] = tmpIndex2;
      tmpArray[3] = tmpIndex3;

      /*check if arrays have been sorted and are different */
      if (charactersQuantumTableCache[0].id === tmpArray[0].id &&
          charactersQuantumTableCache[1].id === tmpArray[1].id &&
          charactersQuantumTableCache[2].id === tmpArray[2].id &&
          charactersQuantumTableCache[3].id === tmpArray[3].id)
      {
        /* go into another loop until they are different*/
        tmpArray    = [];
        arraysEqual = true;
        charactersQuantumTable = charactersQuantumTableCache.slice(0);
      } else {
        arraysEqual = false;
      }
    } while(arraysEqual);

    charactersQuantumTable = tmpArray;
  }

  //Creates a new instance of an object engine
  function getInstanceOfEngine(engine,characters){
    var engineInstance = 'Window.'+ engine + 'Engine';
    return new (eval(engineInstance))(characters);
  }

  function chose_engine(index){
    var EngineHunt    = Engines[1],
        EngineRandom  = Engines[0],
        squareEngine  = Engines[2],
        tableCharCell = charactersQuantumTable[index];

    quantumRandomize++;

    if (Characters[index].getCoordinates()[1] <= 166 && Characters[index].isInsideHome()){
      Characters[index].markAsOutOfTheBox()
    }

    if (!Characters[index].isInsideHome()){

      /*Randomize hunt behaviour in all the ghost after certain time*/
      if(quantumRandomize >= 4000){
        randomizeCharactersQuantumTable()
        quantumRandomize = 0;
      }

      if (tableCharCell.quantumCount >= tableCharCell.quantumStart){
        EngineHunt.newDirection(index);
        tableCharCell.quantumCount++;

        if (tableCharCell.quantumCount >= tableCharCell.quantumEnd){
          tableCharCell.quantumCount = 0;
        }
      } else {
        tableCharCell.quantumCount++;

        //Use hunt engine with the new coordinates aiming to the center square if bitten.
        if(Characters[index].isBitten()){
          EngineHunt.newDirection(index);
        } else {
          EngineRandom.newDirection(index);
        }
      }

    } else {
      //Run random until ghost is out of the box
      if(Characters[index].isBitten()){
        EngineHunt.newDirection(index);
      } else {
        EngineRandom.newDirection(index);
      }
    }
  }

  function newDirection(index){
    //Set direction by Character[index]
    chose_engine(index);
  }

  function seeIfTheyCanKillEachOther(){
    for(var i =0; i < Characters.length -1 ; i++){
      seeifTheyAreTouching(Characters[4],Characters[i])
    }
  }

  function seeIfpacmanCanEatFruit(pacmanCharacter){
    var fruit = {
      x: Window.fruitsController.getFruitCoordinates().x,
      y: Window.fruitsController.getFruitCoordinates().y
    };

    var pacman = {
      x: pacmanCharacter.getCoordinates()[0],
      y: pacmanCharacter.getCoordinates()[1],
    };

    var tolerance = 15,
      xdiff     = Math.abs(pacman.x - fruit.x),
      ydiff     = Math.abs(pacman.y - fruit.y);

    if ((xdiff < tolerance ? true : false) && (ydiff < tolerance ? true : false)){
      //send message to the fuits module
      Window.fruitsController.eatFruit();
    }
  }

  function seeifTheyAreTouching(pacmanCharacter,ghostCharacter){
   var ghost = {
      x: ghostCharacter.getCoordinates()[0],
      y: ghostCharacter.getCoordinates()[1]
    };

    var pacman = {
      x: pacmanCharacter.getCoordinates()[0],
      y: pacmanCharacter.getCoordinates()[1],
    };

    var tolerance = 15,
        xdiff     = Math.abs(pacman.x - ghost.x),
        ydiff     = Math.abs(pacman.y - ghost.y);

    if ((xdiff < tolerance ? true : false) && (ydiff < tolerance ? true : false)){
      if(!ghostCharacter.isBitten()){
        ghostCharacter.getChaseMode() ? kill(ghostCharacter) : kill(pacmanCharacter)
      }
    }
  }

  function kill(character){
    character.isBitten() ? false : character.bitten()
  }

  return {
    registerCharacter: function(character){
      Characters.push(character);
    },

    getMeDirection: function(){
      setDirectionOnEachCharacter();
      monitorEachCharater();
    },

    registerEngines: function(engines){
      var index = engines.length;
      for(var i = 0; i < index; i++){
        //When the engine gets created a copy of the characters is passed in
        Engines.push(getInstanceOfEngine(engines[i],Characters));
      }
    },

    checkPositionOfCharactes: function(){
      seeIfpacmanCanEatFruit(Characters[4]);
      seeIfTheyCanKillEachOther();
    }
  }
})();
