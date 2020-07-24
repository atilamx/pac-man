Window.Labyrinth = (function(){
  var context = Window.myCanvas.context;
  var width   = window.globalConstants.secondOutLayerWidth;
  var raise   = window.globalConstants.secondOutLayerRaise;

  var blueSquareCoordinates = [{trace:'moveTo', x:14, y:11 }, {trace:'lineTo', x:460, y:11}, {trace:'arcTo', a:470, b:11, c:470, d:30, e:10},
    {trace:'lineTo', x:470,y:150}, {trace:'lineTo', x:400,y:150}, {trace:'lineTo', x:400,y:200},
    {trace:'lineTo', x:481,y:200}, {trace:'lineTo', x:481,y:260}, {trace:'lineTo', x:400,y:260},
    {trace:'lineTo', x:400,y:310}, {trace:'lineTo', x:470,y:310}, {trace:'lineTo', x:470,y:490}, {trace:'arcTo', a:470, b:510, c:460, d:510, e:10},
    {trace:'lineTo', x:14, y:510}, {trace:'arcTo', a:10, b:510, c:10, d:500, e:10},
    {trace:'lineTo', x:10, y:310}, {trace:'lineTo', x:80, y:310}, {trace:'lineTo', x:80, y:260},
    {trace:'lineTo', x:-1, y:260}, {trace:'lineTo', x:-1, y:200}, {trace:'lineTo', x:80, y:200},
    {trace:'lineTo', x:80, y:150}, {trace:'lineTo', x:10, y:150}, {trace:'lineTo', x:10, y:20}, {trace:'arcTo', a:10, b:11, c:14, d:11, e:10},
  ];

  var redSquareCoordinates = [{trace:'moveTo', x:10 + width, y:11 + raise },
    {trace:'lineTo', x:240 - 8, y:11+ raise}, {trace:'lineTo', x:240 - 8, y:58 + raise},
    {trace:'lineTo', x:240 + 8, y:58 + raise},
    {trace:'lineTo', x:240 + 8, y:11 + raise},           {trace:'lineTo', x:470 - width , y:11 + raise},
    {trace:'lineTo', x:470 - width, y:150 - raise},      {trace:'lineTo', x:400 - width, y:150 - raise},
    {trace:'lineTo', x:400 - width, y:200 + raise + 3},  {trace:'lineTo', x:481 + width, y:200 + raise + 3},
    {trace:'lineTo', x:481 + width, y:260 - raise -3},   {trace:'lineTo', x:400 - width, y:260 - raise -3},
    {trace:'lineTo', x:400 - width, y:310 + raise},      {trace:'lineTo', x:470 - width, y:310 + raise},
    {trace:'lineTo', x: 470 - width, y:310 + raise},     {trace:'lineTo', x: 470 - width, y:310 + raise + 82},
    {trace:'lineTo', x:470 - width - 30, y:310 + raise + 82},{trace:'lineTo', x:470 - width - 30, y:310 + raise + 98},
    {trace:'lineTo', x:470 - width, y:310 + raise + 98}, {trace:'lineTo', x: 470 - width, y:490 + raise},
    {trace:'lineTo', x:470 - width, y:490 + raise},      {trace:'lineTo', x:10 + width, y:510 - raise},
    {trace:'lineTo', x:10 + width, y:310 + raise + 98},  {trace:'lineTo', x:10 + width + 30, y:310 + raise + 98},
    {trace:'lineTo', x:10 + width + 30, y:310 + raise + 82},{trace:'lineTo', x:10 + width , y:310 + raise + 82},
    {trace:'lineTo', x:10 + width, y:310 +raise},        {trace:'lineTo', x:80 + width, y:310 + raise},
    {trace:'lineTo', x:80 + width, y:260 - raise -3},    {trace:'lineTo', x:-1, y:260 - raise -3},
    {trace:'lineTo', x:-1, y:200 + raise +3},            {trace:'lineTo', x:80+ width, y:200 +raise +3},
    {trace:'lineTo', x:80 + width, y:150 - raise},       {trace:'lineTo', x:10 + width, y:150 - raise},
    {trace:'lineTo', x:10 + width, y:150 - raise},       {trace:'lineTo', x:10+ width, y:20},
  ];

  var whitePillsRanges = pillStorage.get();

  var glowPill = function(){
    var glowcap   = 10,
        intencap  = 8,
        glowSpeed = 0,
        intensity = 0,
        glowValue = [0,1,2,3,4,5,6,7,8,9];

    function incrementPillGlow(){
      intensity > intencap ? intensity = 0 : intensity++;
      glowSpeed = 0;
    }

    return function(){
      glowSpeed === glowcap ? incrementPillGlow() : glowSpeed++;

      return glowValue[intensity];
    }
  }();

  var pills = [];

  //Create Pill object to manage each pill as an object
  var Pill = function(x,y,bigPill){
    this.x = x;
    this.y = y;
    this.bigPill = bigPill;
    this.hasBeenEaten = false;
  };

  var addPillObjects = function(){
    if (pills.length === 0) {
      for (var i = 0; i < whitePillsRanges.length; i++) {
        var isBigPill    = whitePillsRanges[i]['bigPill'],
            limitCoordi  = whitePillsRanges[i]['limitPill'],
            xFixedCoordinate  = whitePillsRanges[i]['Xpill'],
            yFixedCoordinate  = whitePillsRanges[i]['Ypill'],
            currentPlane = whitePillsRanges[i].coordinate,
            isPlaneX     = (currentPlane === "x");

        for (var inc = (isPlaneX ? xFixedCoordinate : yFixedCoordinate); inc < limitCoordi; inc += 15) {
          pills.push(new Pill((isPlaneX ? inc : xFixedCoordinate) , (isPlaneX ? yFixedCoordinate: inc), isBigPill));
        }
      }
    }
  };

  var trackAndDrawPills = function(){
    for(var i = 0; i < pills.length; i++){
      if(pills[i].hasBeenEaten){
        if(pills[i].bigPill && !pills[i].dontDrawAgain){
          pills[i].dontDrawAgain = true;
          roundCircle(pills[i].x, pills[i].y, 20, 1, "black");
        }
      } else {
        if(pills[i].bigPill){
          roundCircle(pills[i].x, pills[i].y, 10, glowPill(3), "white");
        } else {
          //(x, y, w, h, r)
          roundRect(pills[i].x, pills[i].y, 1, 2, 0, "white")
        }
      }
    }
  };

  var drawPills = function(){
    addPillObjects();
    trackAndDrawPills();
  };

  var roundRect = function (x, y, w, h, r,color) {
    context.lineWidth   =  2;
    context.strokeStyle = color || 'blue';
    context.beginPath();
    context.moveTo(x+r, y);
    context.arcTo(x+w, y,   x+w, y+h, r);
    context.arcTo(x+w, y+h, x,   y+h, r);
    context.arcTo(x,   y+h, x,   y,   r);
    context.arcTo(x,   y,   x+w, y,   r);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
    context.stroke();
    context.restore();
  }

  var roundCircle = function(x,y,radius,width,color){
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = width;
    context.strokeStyle = (color === "black" ? color : '#003300');
    context.stroke();
  }

  function schetchLine(coord){
    if (coord.trace == 'moveTo'){
      context.moveTo(coord.x, coord.y);
    } else if (coord.trace == 'lineTo'){
      context.lineTo(coord.x, coord.y);
    } else if (coord.trace == 'arcTo'){
      context.arcTo(coord.a,coord.b,coord.c,coord.d,coord.e);
    }
  }

  function scketchFigure(matrixNameObject, lineWidth, strokeStyle){
    //Get the the address of the array
    var matrixName = eval(matrixNameObject);
    context.beginPath();
    //context.lineWidth   =  lineWidth;
    context.lineWidth   =  2;
    context.strokeStyle = strokeStyle;

    for (tuple =0; tuple < matrixName.length; tuple++ ){
      schetchLine(matrixName[tuple])
    }

    context.stroke();
    context.restore();
  }

  function draw(){
    return {scketchFigure: scketchFigure }
  }

  //draw invisible layers clockwise
  var ranges = MazeLimitStorage.get();

  function compareRanges(coordinates,contexts){
    var pacmanX = coordinates[0];
    var pacmanY = coordinates[1];
    var rangeCordinate = ''

    var wallIsHot = false;
    //compare all ranges and decide if we need to stop  the character

    for(i = 0; i < ranges.length; i++){
      rangeCordinate = ranges[i];

      //Ignore certain coordinates when the ghost has been beaten
      if (contexts.HasBeenBiten() && rangeCordinate.isBitten){
        //exit loop if ghost has been bitten and coordinates are special
        continue;
      }


      switch(rangeCordinate.location){
        case 'up':
          if (pacmanY - (window.globalConstants.secondOutLayerRaise * 1) -7 <= rangeCordinate.iy
            && pacmanY - (window.globalConstants.secondOutLayerRaise * 1) -7 >= rangeCordinate.fy - 10
            && pacmanX - (window.globalConstants.secondOutLayerRaise * 1) -6 <= rangeCordinate.fx
            && pacmanX + (window.globalConstants.secondOutLayerRaise * 1) +8 > rangeCordinate.ix
            && contexts.characterDirection() === rangeCordinate.location
            ){
            return  {temperature: true, hotDirection: 'up'};
          }
          break;
        case 'down':
          if (pacmanY + (window.globalConstants.secondOutLayerRaise * 1) +8 >= rangeCordinate.iy
            && pacmanY + (window.globalConstants.secondOutLayerRaise * 1) +8 <= rangeCordinate.fy +8
            && pacmanX + (window.globalConstants.secondOutLayerRaise * 1) +5 >= rangeCordinate.fx
            && pacmanX + (window.globalConstants.secondOutLayerRaise * 1) +8 <= rangeCordinate.ix
            && contexts.characterDirection() === rangeCordinate.location
            ){

            return  {temperature: true, hotDirection: 'down'};
          }
          break;
        case 'left':
          if (pacmanY - (window.globalConstants.secondOutLayerRaise * 1) -5 <= rangeCordinate.iy
            && pacmanY + (window.globalConstants.secondOutLayerRaise * 1) -7  >= rangeCordinate.fy
            && (pacmanX - (window.globalConstants.secondOutLayerRaise * 1) +2 <= rangeCordinate.ix + 10 && pacmanX - (window.globalConstants.secondOutLayerRaise * 1)  >= rangeCordinate.fx)
            && contexts.characterDirection() === rangeCordinate.location
            ){

            return  {temperature: true, hotDirection: 'left'};
          }
          break;
        case 'right':
          if (pacmanX + (window.globalConstants.secondOutLayerRaise * 1) +8 >= rangeCordinate.ix
            && pacmanY - (window.globalConstants.secondOutLayerRaise * 1) -4 <= rangeCordinate.fy
            && pacmanY + (window.globalConstants.secondOutLayerRaise * 1) +4 >= rangeCordinate.iy
            && pacmanX - (window.globalConstants.secondOutLayerRaise * 1) -4 <= rangeCordinate.fx
            && contexts.characterDirection() === rangeCordinate.location
            ){

            return {temperature: true, hotDirection: 'right'};
          }
          break;
      }
    }

    return wallIsHot;
  }

  function hotAreasSearch(contexts){
    var coordinates = contexts.characterCoordinate().getCurrentCoordinates()
    return compareRanges(coordinates,contexts);
  }

  return {
    colorPalete: {
      outercounter: 0,
      counter: 0,
      colors: [
        'purple',
        'white',
        'purple',
        'white',
        'purple'
      ]
    },
    layer: draw(),
    init: function(){
      this.layer.scketchFigure('blueSquareCoordinates', 3, 'blue');
    },
    backReDraw: function(){
      //middle square
      roundRect(165,182,148,95,5);
      roundRect(174,192,130,75,5);
    },

    otterWall: function(color){
      this.layer.scketchFigure('blueSquareCoordinates', 3, color || 'blue');
    },

    squetchWalls: function(){
      if(window.globalConstants.newLevel){
        if(this.colorPalete.outercounter < 40){
          this.colorPalete.outercounter++
        } else {
          this.colorPalete.outercounter = 0
          this.colorPalete.counter = 0
        }

        if (this.colorPalete.outercounter < 10){
          this.colorPalete.counter = 0
        } else if (this.colorPalete.outercounter > 10 && this.colorPalete.outercounter < 20){
          this.colorPalete.counter = 1
        } else if (this.colorPalete.outercounter > 20 && this.colorPalete.outercounter < 30){
          this.colorPalete.counter = 2
        } else if (this.colorPalete.outercounter > 30 && this.colorPalete.outercounter < 40){
          this.colorPalete.counter = 3
        }

        this.otterWall(this.colorPalete.colors[this.colorPalete.counter + 1]);
        this.frontReDraw(this.colorPalete.colors[this.colorPalete.counter]);
      } else {
        this.otterWall();
        this.frontReDraw();
      }
    },

    frontReDraw: function(color){

     this.layer.scketchFigure('redSquareCoordinates', 3, color || 'red');
      roundRect(52,53,38,14,2,color||"blue");
      roundRect(52,98,39,8,4,color||"blue");
      roundRect(122,53,74,14,5,color||"blue");

      roundRect(122,138,74,10,5,color||"blue");//pole
      roundRect(122,98,10,115,5,color||"blue");
      roundRect(122,247,10,73,5,color||"blue");

      //midle
      roundRect(235,98,10,50,5,color||"blue");
      roundRect(170,98,140,8,4,color||"blue");
      roundRect(283,53,74,14,5,color||"blue");
      roundRect(390,53,38,14,5,color||"blue");
      roundRect(390,98,39,8,4,color||"blue");

      roundRect(283,138,74,10,5,color||"blue"); //pole
      roundRect(348,98,10,115,5,color||"blue");

      roundRect(348,247,10,73,5,color||"blue");

      //middle
      roundRect(235,310,10,61,5,color||"blue");
      roundRect(170,310,140,8,4,color||"blue");


      roundRect(81,352,10,66,5,color||"blue");
      roundRect(52,352,39,20,5,color||"blue");

      roundRect(122,352,75,20,5,color||"blue");
      roundRect(282,352,75,20,5,color||"blue");

      roundRect(390,352,10,66,5,color||"blue");
      roundRect(390,352,39,20,5,color||"blue");

      //middle
      roundRect(235,405,10,61,5,color||"blue");
      roundRect(170,405,140,8,4,color||"blue");


      //middle
      roundRect(124,405,10,59,5,color||"blue");

      roundRect(55,450,140,15,4,color||"blue");

      roundRect(348,405,10,59,5,color||"blue");
      roundRect(286,450,140,15,4,color||"blue");

    },

    checkHotAreas: function(contexts){
      return hotAreasSearch(contexts);
    },

    addPills: function() {
      drawPills();
    },

    getPillCoordinates: function(){
      /* this method is meant to be called by the
      *  Pacman character
      *
      */
      return pills;
    }
  }
})();
