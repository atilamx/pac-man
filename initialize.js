Window.InitializeCanvas = function(canvasNumber){
   var  setCanvas = function(){
    var canvas = document.getElementById(canvasNumber);
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;

    return { context: context, centerX: x, centerY: y };
  };

  return setCanvas();
};

Window.myCanvas = Window.InitializeCanvas('myCanvas');

/*
 *This Module handles the left and right screen
 */
Window.ScreenCanvas = (function Screen(){
  var context = null,
    urls = [],
    wholeTexts = [],
    color = null,
    textsIndex  = 0,
    wholeTextIndex = 0,
    speed = null,
    skullCounter = 0,
    skullCounter2 = 0,
    img = new Image(),
    img2 = new Image();

  function getSourceCode(url){

    var xhr = new XMLHttpRequest();

    xhr.open('GET', encodeURI(url));

    xhr.onload = function() {
      if (xhr.status === 200) {
        wholeTexts[textsIndex++] = xhr.response;
      }
      else {
        console.log('Request failed.  Returned status of ' + xhr.status);
      }
    };

    xhr.send();
  }

  var initialize = function(extContext){
    context  = extContext.context;
    color    = extContext.color;
    speed    = extContext.speed;

    urls = [
      'global_constants.js',
      'initialize.js',
      'leftCanvas.js',
      'interrupts.js',
      'eventsobserver.js',
      'keyobserver.js',
      'scoreobserver.js',
      'storage/base.js',
      'storage/lifes.js',
      'textscore.js',
      'sound_effects.js',
      'engine.js',
      'randomEngine.js',
      'huntEngine.js',
      'squareEngine.js',
      'megamind.js',
      'gameCharacterVelocity.js',
      'gameCharacter.js',
      'maze.js',
      'maze_limits.js',
      'pills.js',
      'labyrinth.js',
      'graph_constructor.js',
      'loop.js',
      'scoreobserver.js',
      'gameCharacter.js',
      'megamind.js'
    ];

    for(var i = 0; i< urls.length;i++) {
      getSourceCode(urls[i])
    }

    wholeTextIndex = randomIndex(urls.length);

    img.src = "www/images/skull.jpg"
    img2.src= "www/images/skull2.jpg"
  }

  var printChunk = function(){
    var index = 0;
    var cursor = 0;
    var printvelocity = 0;
    var column = 0;
    var message = '';

    function clearScreen(){
      context.beginPath();
      context.fillStyle = 'black';
      context.fillRect(0,0,280,400);
    }

    return function() {
      if (printvelocity == speed) {
        if(message[index]) {
          context.beginPath();
          context.font = "12px Courier New";
          context.fillStyle = color;
          context.fillText(message[index], 4 + cursor, 10 + column);

          if (message[index].charCodeAt(0) == 10){
            //new line
            column += 10;
            cursor = 0;
          }

          if (column > 390){
            cursor = 0;
            column = 0;
            clearScreen();
          }

          cursor >= (message.length * 6) - 6 ? (cursor = 0, column += 10) : cursor += 6;
        }

        if(index >= message.length - 1 ){
          index = 0;
          message = getChunkOfText()
        } else {
          index += 1;
        }

        printvelocity = 0;
      } else {
        printvelocity++;
      }
    }
  }();

  var randomIndex = function (seed){
    return Math.floor((Math.random() * seed) )
  }

  var getChunkOfText = function(){
    var counter = 0;
    var tmpString = '';
    var returnString = '';

    function getMesomeChunk(count){
      var tmpChar = null;

      for (var i = counter;i < counter + count; i++){
        try {
          tmpChar = wholeTexts[wholeTextIndex][i];
        }
        catch (e) {
          tmpChar = undefined;
        }

        if(!tmpChar){
          counter = 0;
          wholeTextIndex = randomIndex(wholeTexts.length);
          break;
        }
        tmpString = tmpString.concat(tmpChar);
      }
      counter += count;
      returnString = tmpString;
      if (tmpString.length == 0){
        counter = 0;
      }
      tmpString = '';
      return returnString;
    }

    return function(){
      return getMesomeChunk(44);
    };
  }();

  var printSkull = function(){
    if(skullCounter <10){
      context.drawImage(img,0,0,283,400);
    } else {
      context.drawImage(img2,0,0,283,400);
      skullCounter2++
      if (skullCounter2 > 20){
        skullCounter  =0;
        skullCounter2 = 0;
      }
    }
    skullCounter++
  };

  var print = function(){
    if (window.globalConstants.gameOver && window.globalConstants.level < 2){
      printSkull();
    } else {
      printChunk();
    }
  }

  return {
    init: initialize,
    printScreen: print,
    clone: function(){
      return new Screen();
    }
  }
})();

