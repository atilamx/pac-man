Window.Engine = function Engine(){

  //Random Generators
  this.getRandomNumber = function (seed){
    return Math.floor((Math.random() * seed) + 1)
  }

  this.randomIntFromInterval = function(min,max)
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  this.newDirection = function (obj){
    /*
     * Override me
     */
  }

  //Random functions use by diferent engines

  this.getRandomDirection = function(min,max){
    switch(this.randomIntFromInterval(min,max))
    {
      case 1:
        return 'up';
        break;
      case 2:
        return 'down';
        break;
      case 3:
        return 'left';
        break;
      case 4:
        return 'right';
        break;
      default:
        return 'up'
        break;
    }
  }

  this.compareDirections = function(charDirection, charPreviousDirection,character){

    //Detect if Ghost is stuck
    if (this.detectIfStuck(character)){
      /*
       * Detect when Character gets Stuck
       */
      return this.getRandomDirection(1,4);
    }

    if ((charDirection === 'up' && charPreviousDirection === 'down') ||(charDirection === 'down' && charPreviousDirection === 'up')){
      return this.getRandomDirection(3,4)
    }
    else if ((charDirection === 'left' && charPreviousDirection === 'righ' )||(charDirection === 'right' && charPreviousDirection === 'left' )){
      return this.getRandomDirection(1,2)
    }

    if ((charDirection === 'up' && charPreviousDirection === 'up' ) || (charDirection === 'down' && charPreviousDirection === 'down' )){
      return this.getRandomDirection(3,4)
    }
    else if ((charDirection === 'left' && charPreviousDirection === 'left' ) || (charDirection === 'right' && charPreviousDirection === 'right' )){
      return this.getRandomDirection(1,2)
    }

    if ((charDirection === 'up' && charPreviousDirection === 'left' )||(charDirection === 'up' && charPreviousDirection === 'right' )){
      return this.getRandomDirection(3,4)
    }
    else if ((charDirection === 'left' && charPreviousDirection === 'up' ) || (charDirection === 'right' && charPreviousDirection === 'up' )){
      return this.getRandomDirection(1,2)
    }

    if ((charDirection === 'down' && charPreviousDirection === 'left' ) || (charDirection === 'down' && charPreviousDirection === 'right' )){
      return this.getRandomDirection(3,4)
    }

    //If we reach this point just return random chit!
    return this.getRandomDirection(1,4);
  }


  this.detectIfStuck = function(character){
    var coordinates = character.getCoordinates();
    character.storeCordinates(coordinates);

    var stack = character.getCordinatesStack();

    if (stack.length > 10){
      for(i = 0; i < stack.length - 1;i++){
        if (stack[i][0] == stack[i + 1][0] && stack[i][1] == stack[i + 1][1]){
          continue;
        } else{
          return false;
        }
      }
      //it is stuck!
      return true;
    }
  }
};
