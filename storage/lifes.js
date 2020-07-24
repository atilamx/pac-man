Window.lifesStorage = function(){
  this.x = 360;
  this.y = 530;
  this.killed = 0;
  this.storage = [];
  this.lifes = function(){
    return this.storage.length;
  };

  this.removeLife = function(){
    this.x = this.storage[this.storage.length -1].x
    this.y = this.storage[this.storage.length -1].y
    this.storage.pop()

    this.killed += 1;
  }

  this.addLifes = function(number){
    /*
     * This logic its a mess but the problem was hard to hack :(
     */
    for(var i =0; i < number ; i++){
      this.storage.push({
        x:this.x,
        y:this.y
      });

      if( this.storage.length  % 3 == 0){
        this.x = 360
      } else {
        this.x += 40;
      }

      if(this.storage.length <= 2){
        this.y = 530;
      } else if (this.storage.length >= 3 && this.storage.length <= 5){
        this.y = 560;
      } else if (this.storage.length >= 6 &&  this.storage.length <= 8){
        this.y = 590;
      }
    }
  };

  this.getKilles = function(){
    return this.killed;
  };

  this.resetKilledTimes = function(){
    this.killed = 0;
  };
}

Window.lifesStorage.prototype = new Window.BaseStorage;
var lifesStorage = new Window.lifesStorage;

lifesStorage.addLifes(3);


