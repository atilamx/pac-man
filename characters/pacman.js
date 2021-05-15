var Pacman = {
  mouthGrades:  {
    rGrades10:  0.174532925,
    rGrades350: 6.108652382,
    rGrades20:  0.34906585,  //20
    rGrades340: 5.934119457, //340
    rGrades30:  0.523598776,
    rGrades330: 5.759586532,

    rGradesClose0: 0,
    rGradesClose360: 6.283185307,


    lGrades10:  3.316125579, //190
    lGrades350: 2.967059728, //170
    lGrades20:  3.490658504, //200
    lGrades340: 2.792526803, //160
    lGrades30:  3.665191429, //210
    lGrades330: 2.617993878, //150
    lGradesClose0: 3.141592654,//180
    lGradesClose360: 3.124139361,

    uGrades10:  4.886921906, //280
    uGrades350: 4.537856055, //260
    uGrades20:  5.061454831, //290
    uGrades340: 4.36332313, //250
    uGrades30:  5.235987756, //300
    uGrades330: 4.188790205, //240
    uGradesClose0: 4.71238898, //270
    uGradesClose360: 4.694935688,//269

    dGrades10:  1.745329252,//100
    dGrades350: 1.396263402,//80
    dGrades20:  1.919862177,//110
    dGrades340: 1.221730476,//70
    dGrades30:  2.094395102,//120
    dGrades330: 1.047197551,//60
    dGradesClose0: 1.570796327, //90
    dGradesClose360: 1.553343034,//90

    get: function(grade){
      switch(grade){
        case 'r10':
          return { startAngle: this.rGrades10, endAngle: this.rGrades350 };
          break;
        case 'r20':
          return { startAngle: this.rGrades20, endAngle: this.rGrades340 };
          break;
        case 'r30':
          return { startAngle: this.rGrades30, endAngle: this.rGrades330 };
          break;
        case 'rClose':
          return { startAngle: this.rGradesClose0, endAngle: this.rGradesClose360 };
          break;
        case 'l10':
          return { startAngle: this.lGrades10, endAngle: this.lGrades350 };
          break;
        case 'l20':
          return { startAngle: this.lGrades20, endAngle: this.lGrades340 };
          break;
        case 'l30':
          return { startAngle: this.lGrades30, endAngle: this.lGrades330 };
          break;
        case 'lClose':
          return { startAngle: this.lGradesClose0, endAngle: this.lGradesClose360 };
          break;
        case 'u10':
          return { startAngle: this.uGrades10, endAngle: this.uGrades350 };
          break;
        case 'u20':
          return { startAngle: this.uGrades20, endAngle: this.uGrades340 };
          break;
        case 'u30':
          return { startAngle: this.uGrades30, endAngle: this.uGrades330 };
          break;
        case 'uClose':
          return { startAngle: this.uGradesClose0, endAngle: this.uGradesClose360 };
          break;
        case 'd10':
          return { startAngle: this.dGrades10, endAngle: this.dGrades350 };
          break;
        case 'd20':
          return { startAngle: this.dGrades20, endAngle: this.dGrades340 };
          break;
        case 'd30':
          return { startAngle: this.dGrades30, endAngle: this.dGrades330 };
          break;
        case 'dClose':
          return { startAngle: this.dGradesClose0, endAngle: this.dGradesClose360 };
          break;
      }
    }
  },
  degreesToRadians: function(degrees) {
    return (degrees * Math.PI)/180;
  },
  drawMoneyEarned: function(pcProperties){
    var x = pcProperties.x,
        y = pcProperties.y;

    var context = pcProperties.context;

    context.beginPath();
    context.font = "bold 14px Comic";
    context.fillStyle = "Chartreuse";

    context.fillText(Window.SoundEffects.getGhostScore(),x - 9,y);
  },
  drawYellowPie: function(action,pcProperties,dyePacman,shrinkAngle){
    var x, y, radius, startAngle, endAngle, fillColor;

    if (action === 'fill'){
      radius = pcProperties.radius;

      if(dyePacman){
        startAngle = Pacman.degreesToRadians(0);
        endAngle   = Pacman.degreesToRadians(shrinkAngle -=4);
      } else {
        startAngle = pcProperties.startAngle;
        endAngle   = pcProperties.endAngle;
      }

      x = pcProperties.x;
      y = pcProperties.y;

      fillColor = pcProperties.fillColor;
    }

    context = pcProperties.context;
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, pcProperties.counterClockwise);
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.lineTo(x, y);
    context.fillStyle = fillColor;
    context.fill();
    context.arc(x, y, radius, endAngle, startAngle, true);
    context.lineTo(x, y)
    context.stroke();
    context.restore();
    return shrinkAngle;
  },
  mouth: function(contexts){
    var counter = 0;
    var delta = window.globalConstants.mouthDelta;
    function inHotArea(){
      //pass the context of the current character to the laberinth
      if (Window.Labyrinth.checkHotAreas(contexts)){

      } else {
        counter++;
      }
      if (counter == (delta * 4) + 1 ){
        counter = 0;
      }
    }

    function angle(direction){

      if (counter >= 0 && counter <= delta){
        inHotArea();
        switch(direction){
          case 'right':
            return 'r10'
            break;
          case 'left':
            return 'l10'
            break;
          case 'up':
            return 'u10'
            break;
          case 'down':
            return 'd10'
            break;
        }
      } else if (counter >= (delta + 1) && counter <= (delta * 2)) {
        inHotArea();
        switch(direction){
          case 'right':
            return 'r20'
            break;
          case 'left':
            return 'l20'
            break;
          case 'up':
            return 'u20'
            break;
          case 'down':
            return 'd20'
            break;
        }
      } else if (counter >= (delta * 2) + 1 && counter <= (delta * 3)) {
        inHotArea();
        switch (direction){
          case 'right':
            return 'r30'
            break;
          case 'left':
            return 'l30'
            break;
          case 'up':
            return 'u30'
            break;
          case 'down':
            return 'd30'
            break;
        }
      } else if (counter >= (delta * 3) + 1 && counter <= (delta * 4)) {
        inHotArea();
        //counter = 0
        switch (direction){
          case 'right':
            return 'rClose'
            break;
          case 'left':
            return 'lClose'
            break;
          case 'up':
            return 'uClose'
            break;
          case 'down':
            return 'dClose'
            break;
        }
      }
    }
    return angle;
  },
  EatPill: function(pillCoordinates,trackCoordinates){
    if (pillCoordinates.length > 0) {
      for (var i = 0; i < pillCoordinates.length; i++) {
        if (!pillCoordinates[i].hasBeenEaten && this.withinRange(pillCoordinates[i],trackCoordinates)) {
          pillCoordinates[i].hasBeenEaten = true;
          pillStorage.addPillCount();
          Window.SoundEffects.eatenPill(pillCoordinates[i]);
        }
      }
    }
  },
  withinRange: function(pillCoordinates,trackCoordinates){
    var pillDistance = 8,
      coordinates  = trackCoordinates.getCurrentCoordinates(),
      xdiff        = Math.abs(pillCoordinates['x'] - coordinates[0]),
      ydiff        = Math.abs(pillCoordinates['y'] - coordinates[1]);

    return (xdiff < pillDistance ? true : false) && (ydiff < pillDistance ? true : false)
  }
};


