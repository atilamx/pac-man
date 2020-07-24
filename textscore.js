Window.Texts = (function (){
  var context = Window.myCanvas.context;
  var lifesCoordinates = lifesStorage.get();
  var gameLevel = 1;
  var semaphore = false;

  var drawScore = function(){
    context.beginPath();
    context.font = "30px Courier New";
    context.fillStyle = "white";
    context.fillText("SCORE",25,540);
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(125,515,80,40);
    context.beginPath();
    context.font = " 30px sans-serif ";
    context.fillStyle = "yellow";
    context.fillText(window.globalConstants.score,130,540);
  };

  var drawGetReady = function(){
    if(!semaphore){
      semaphore = true;
      context.beginPath();
      context.font = "30px Courier New";
      context.fillStyle = "yellow";
      context.fillText("GET READY!",154,300);
      semaphore = false;
    }
  };

  var NextLevel = function(){
    gameLevel += 1;
    context.beginPath();
    context.font = "bold 30px Courier New";
    context.fillStyle = "green";
    context.fillText("LEVEL -> " + gameLevel,154,300);
  };

  var GameOver = function(){
    context.beginPath();
    context.font = "bold 30px Courier New";
    context.fillStyle = "RED";
    context.fillText("GAME OVER!",154,300);
  };

  var eraseGetReady = function(){
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(155,280,178,22);
  };

  var removeLifes = function(){
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(325,515,150,85);

  }

  var drawLifes = function(){
    var lifes = lifesStorage.get();

    removeLifes()
    for (var i = 0; i < lifes.length;i++) {
      var x = lifes[i].x,
          y = lifes[i].y;

      context.beginPath();
      context.arc(x, y, 13, 0.34906585, 5.934119457, false);
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.lineTo(x, y);
      context.fillStyle = 'yellow';
      context.fill();
      context.arc(x, y, 13, 5.934119457, 0.34906585, true);
      context.lineTo(x, y)
      context.stroke();
      context.restore();
    }
  };

  var fruitScore = function(points){
    context.beginPath();
    context.font = "bold 40px Courier New";
    context.fillStyle = "yellow";
    context.fillText(points,200,400);
  };

  var Level = function(){
    context.beginPath();
    context.font = " 30px Courier New";
    context.fillStyle = "white";
    context.fillText("LEVEL",28,570);
    context.fillStyle = "yellow";
    context.fillText( gameLevel,130,570);
  };

  var pause = function(){
    if (!Window.SoundEffects.startGameSound().playing && window.globalConstants.pause){
      eraseGetReady()
      context.beginPath();
      context.font = " 30px Courier New";
      context.fillStyle = "yellow";
      context.fillText("PAUSE",200,300);
    }
  };

  return {
    drawScore: drawScore,
    drawGetReady: drawGetReady,
    eraseGetReady: eraseGetReady,
    drawLifes: drawLifes,
    drawGameOver: GameOver,
    drawNextLevel: NextLevel,
    drawFruitScore: fruitScore,
    drawLevel: Level,
    drawPause: pause,

  }
})();

console.log("Loading score...");

