var Ghost = {
  drawGhostEye: function(context, centerX, centerY, width, height, eyePostion, eyeDistanceFromCenter, action, ghostChaseMode, pacmanDirection) {
    var pupilRadius        = 1.7,
        eyePupilIncrementX = 0,
        eyePupilIncrementY = 0;

    switch (pacmanDirection) {
      case 'right':
        eyePupilIncrementX = +2;
        break;
      case 'left':
        eyePupilIncrementX = -2;
        break;
      case 'up':
        eyePupilIncrementY = -3;
        break;
      case 'down':
        eyePupilIncrementY = +3;
        break;
    }

    centerX += eyeDistanceFromCenter[0];
    centerY += eyeDistanceFromCenter[1];
    context.beginPath();

    context.moveTo(centerX, centerY - height/2); // A1

    //Draw eyes
    if(!ghostChaseMode){

      context.bezierCurveTo(
          centerX + width / 2, centerY - height / 2, // C1
          centerX + width / 2, centerY + height / 2, // C2
        centerX, centerY + height / 2); // A2

      context.bezierCurveTo(
          centerX - width / 2, centerY + height / 2, // C3
          centerX - width / 2, centerY - height / 2, // C4
        centerX, centerY - height / 2); // A1


      context.fillStyle = (action === 'delete' ? "black" : 'white');
      context.fill();
      context.closePath();
    }

    //Draw pupil direction

    context.beginPath();

    if(ghostChaseMode){
      /*
       * Static eyes
       */
      context.moveTo(centerX,centerY );
      context.arc(centerX , centerY , 2.5, 0, Math.PI*2, false );
    } else {
      /*
       * Move eyes according to direction
       */
      if (eyePostion == 'right'){
        context.moveTo(centerX,centerY );
        context.arc(centerX + eyePupilIncrementX, centerY + eyePupilIncrementY , pupilRadius, 0, Math.PI*2, false );
      } else {
        context.moveTo(centerX,centerY );
        context.arc(centerX + eyePupilIncrementX, centerY + eyePupilIncrementY, pupilRadius, 0, Math.PI*2, false );
      }
    }

    context.lineWidth = 1;
    context.strokeStyle = 'blue';


    context.fillStyle = ghostChaseMode ? Window.SoundEffects.getColorFromSoundPostion('eye') : 'blue';


    context.fill();
  },
  drawGhostBody: function(context, radius, x, y, fillColor, action, toggle, ghostFrecuency, ghostChaseMode){
    var limLeft = (x - radius),
      length  = (radius * 2),
      segment = (length / 4),
      firstSegmentCoordinate     = limLeft,
      secondthSegmentCoordinate  = (firstSegmentCoordinate    + segment),
      thirdthSegmentCoordinate   = (secondthSegmentCoordinate + segment),
      fourthSegmentCoordinate    = (thirdthSegmentCoordinate  + segment);

    var leftMouthx = x - 10,
        leftMouthy = y + 6.5;

    context.beginPath();
    context.lineWidth = 1;
    context.arc(x, y, radius, 0, Math.PI * 1, true);
    context.moveTo(x,y);
    context.moveTo(x + radius , y );
    context.lineTo(x + radius , y + radius );

    ///Three legs for the ghost
    if (toggle) {
      context.lineTo(x + (radius / 2) , y + (radius / 2) );
      context.lineTo(x, y + radius );
      context.lineTo(x - (radius / 2), y + (radius / 2) );
      context.lineTo(x - radius  , y + radius );
      context.lineTo(x - radius  , y );

      if (action == 'delete' && ghostFrecuency > 15){
        toggle = false;
        ghostFrecuency = 0;
      }
    } else if(toggle == false){
      //Four legs for the ghost
      context.lineTo(fourthSegmentCoordinate, y   + (radius / 2));
      context.lineTo(fourthSegmentCoordinate, y   + radius);
      context.lineTo(thirdthSegmentCoordinate, y  + (radius / 2));
      context.lineTo(secondthSegmentCoordinate, y + radius);
      context.lineTo(secondthSegmentCoordinate, y + (radius / 2));
      context.lineTo(firstSegmentCoordinate, y    + radius);
      context.lineTo(firstSegmentCoordinate, y);

      if (action == 'delete' && ghostFrecuency > 15){
        toggle = true;
        ghostFrecuency = 0;
      }
    }
    ghostFrecuency++;

    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.fillStyle = fillColor;
    context.fill();

    /*
     * Draw worry mouth expression when big pill has been eaten
     */
    if(ghostChaseMode) {
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = (action == 'delete' ? "black" : Window.SoundEffects.getColorFromSoundPostion('mouth'))
      context.moveTo(leftMouthx, leftMouthy);

      for (var i=0;i <3;i++) {
        context.lineTo(leftMouthx += 3.4, leftMouthy -= 4);
        context.lineTo(leftMouthx += 3.4, leftMouthy += 4);
      }

      context.stroke();
    }
    return {ghostFrecuency:ghostFrecuency,toggle: toggle};
  },
  drawGhost: function(action, pcProperties,toggle,trackCoordinates, ghostFrecuency, ghostChaseMode,HasBeenBitten,inTheBlueBox,threeTimes,pacmanDirection){
    var x, y, radius, fillColor;
    var tmpObject = {};

    if (action === 'fill'){
      radius = pcProperties.radius;
      x = pcProperties.x;
      y = pcProperties.y;
      fillColor = pcProperties.fillColor;
    }
    var context = pcProperties.context;

    if ((trackCoordinates.getCurrentCoordinates('x') > 150  &&
      trackCoordinates.getCurrentCoordinates('x') < 300) &&
      (trackCoordinates.getCurrentCoordinates('y') > 200  &&
        trackCoordinates.getCurrentCoordinates('y') < 250) &&
      HasBeenBitten
      ){
      /*
       * Tweek this bitch until get the desired behaviour
       *
       */
      HasBeenBitten = false;
      inTheBlueBox = true; //set this to true so the ghost knows is in the cage
      threeTimes = 0;
    }

    if(!HasBeenBitten){
      tmpObject = this.drawGhostBody(context, radius, x, y, fillColor, action, toggle, ghostFrecuency, ghostChaseMode);
    } else {
      tmpObject['HasBeenBitten'] = HasBeenBitten;
      tmpObject['inTheBlueBox'] = inTheBlueBox;
      tmpObject['threeTimes'] = threeTimes;
      tmpObject['toggle'] = toggle;
      tmpObject['ghostFrecuency'] = ghostFrecuency;
    }


    this.drawGhostEye(context, x, y, 9, 9,'right',[5,-4],action,ghostChaseMode,pacmanDirection);
    this.drawGhostEye(context, x, y, 9, 9,'left',[-5, -4],action,ghostChaseMode,pacmanDirection);


    return tmpObject;
  }
}
;
