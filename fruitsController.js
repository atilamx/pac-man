/*
 * This module controls the fruits, when they should appear and disappear
 * as well as the points that are going to be added to the global score
 * when they are eaten.
 */


Window.fruitsController = (function (){
  var context = Window.myCanvas.context,
      counter = 0;

  var fruits = null,
      fruitX = 228,
      fruitY = 285;

  var bell       = new Image(),
      apple      = new Image(),
      orange     = new Image(),
      galaxian   = new Image(),
      strawberry = new Image();

  var fruitObject = {
    eaten:   false,
    visible: false,
    showFlag: true
  };

  var initialize = function(){
    bell.src       = "bell.jpg";
    apple.src      = "apple.png";
    orange.src     = "orange.png";
    galaxian.src   = "galaxian.png";
    strawberry.src = "strawberry.png";

    fruits = [
              {obj: apple     ,cost: 400 },
              {obj: strawberry,cost: 600 },
              {obj: orange    ,cost: 800 },
              {obj: bell      ,cost: 1200},
              {obj: galaxian  ,cost: 1400}
             ];
  };

  var fruit = function(){
    var percent = pillStorage.getPercentage();

    if(((percent > 40 && percent < 50 || percent > 80 && percent < 95) && !fruitObject.eaten)){

      fruitObject.visible = true;

      if(fruitObject.showFlag){
        context.drawImage(fruits[counter].obj,fruitX,fruitY,25,25);
      }

    } else {
      fruitObject.visible = false;
    }
  };

  var increment =  function(){
    /*
    * increment on each level
    */
    counter < 5 ? counter += 1 : counter  = 0
  };

  var fruitCoordinates = function(){
    return {x: fruitX, y: fruitY};
  };

  var clear = function(){
    fruitObject = {
      eaten:    false,
      visible:  false,
      showFlag: true
    }
  };

  var setFlagsAndSound = function(){
    fruitObject.showFlag = false;
    fruitObject.eaten    = true;
    Window.SoundEffects.eatFruit();
    Window.Texts.drawFruitScore(fruits[counter].cost);
    window.globalConstants.score += fruits[counter].cost;
    window.globalConstants.stopCharacters = true;
  };

  var eatFruit = function(){
    fruitObject.visible ? setFlagsAndSound() : false
  };

  return {
    init: initialize,
    drawFruit: fruit,
    incrementFruit: increment,
    getFruitCoordinates: fruitCoordinates,
    eatFruit: eatFruit,
    clear: clear
  }
})();

Window.fruitsController.init();
