console.log("pills loaded...")
Window.PillStorage = function(){
  this.count = 0,
  this.addPillCount = function(){
    this.count += 1;
    this.checkIfnoPillsLeft()
  },
  this.clearCount = function(){
    var pills = this.getPillCount();

    for (var i = 0; i < this.count;i++){
      pills[i].hasBeenEaten = false;
    }
    this.count = 0;
  },
  this.checkIfnoPillsLeft =function(){
   var pills = this.getPillCount();

   if(this.count == pills.length){
     Window.SoundEffects.clearLevelSound();
   }
  },
  this.getPillCount = function(){
    return Window.Labyrinth.getPillCoordinates();
  },
  this.getPillsEaten = function(){
    return this.count;
  },
  this.getPercentage = function(){
    var hundred   = this.getPillCount().length,
        remaining =  (100 * (this.getPillsEaten() + 1));

    return remaining / hundred;
  }
  this.storage = [
    {Xpill:52,Ypill:36,limitPill:95,coordinate:'x'},
    {Xpill:121,Ypill:36,limitPill:200,coordinate:'x'},
    {Xpill:285,Ypill:36,limitPill:350,coordinate:'x'},
    {Xpill:390,Ypill:36,limitPill:430,coordinate:'x'},
    {Xpill:52,Ypill:82,limitPill:95,coordinate:'x'},
    {Xpill:121,Ypill:82,limitPill:200,coordinate:'x'},
    {Xpill:231,Ypill:388,limitPill:250,coordinate:'x'},
    {Xpill:231,Ypill:481,limitPill:250,coordinate:'x'},
    {Xpill:286,Ypill:82,limitPill:350,coordinate:'x'},
    {Xpill:390,Ypill:82,limitPill:430,coordinate:'x'},
    {Xpill:52,Ypill:120,limitPill:95,coordinate:'x'},
    {Xpill:150,Ypill:120,limitPill:220,coordinate:'x'},
    {Xpill:270,Ypill:120,limitPill:340,coordinate:'x'},
    {Xpill:390,Ypill:120,limitPill:430,coordinate:'x'},
    {Xpill:270,Ypill:335,limitPill:360,coordinate:'x'},
    {Xpill:120,Ypill:335,limitPill:220,coordinate:'x'},
    {Xpill:270,Ypill:388,limitPill:360,coordinate:'x'},
    {Xpill:120,Ypill:388,limitPill:220,coordinate:'x'},
    {Xpill:270,Ypill:431,limitPill:340,coordinate:'x'},
    {Xpill:150,Ypill:431,limitPill:220,coordinate:'x'},
    {Xpill:270,Ypill:481,limitPill:380,coordinate:'x'},
    {Xpill:52,Ypill:335,limitPill:95,coordinate:'x'},
    {Xpill:52,Ypill:385,limitPill:80,coordinate:'x'},
    {Xpill:52,Ypill:431,limitPill:95,coordinate:'x'},
    {Xpill:52,Ypill:481,limitPill:200,coordinate:'x'},
    {Xpill:390,Ypill:335,limitPill:430,coordinate:'x'},
    {Xpill:410,Ypill:385,limitPill:430,coordinate:'x'},
    {Xpill:390,Ypill:431,limitPill:430,coordinate:'x'},
    {Xpill:390,Ypill:431,limitPill:430,coordinate:'x'},
    {Xpill:390,Ypill:481,limitPill:430,coordinate:'x'},

    //big pills
    {Xpill:34,Ypill:385,limitPill:35,bigPill:true,coordinate:'x'},
    {Xpill:34,Ypill:60,limitPill:35,bigPill:true,coordinate:'x'},
    {Xpill:445,Ypill:385,limitPill:450,bigPill:true,coordinate:'x'},
    {Xpill:445,Ypill:60,limitPill:450,bigPill:true,coordinate:'x'},

    {Xpill:105,Ypill:36,limitPill:430},
    {Xpill:372,Ypill:36,limitPill:430},
    {Xpill:36,Ypill:36,limitPill:120},
    {Xpill:443,Ypill:36,limitPill:120},
    {Xpill:215,Ypill:36,limitPill:90},
    {Xpill:264,Ypill:36,limitPill:90},
    {Xpill:150,Ypill:100,limitPill:110},
    {Xpill:330,Ypill:100,limitPill:110},
    {Xpill:210,Ypill:355,limitPill:380},
    {Xpill:269,Ypill:355,limitPill:380},
    {Xpill:33,Ypill:336,limitPill:380},
    {Xpill:440,Ypill:336,limitPill:380},
    {Xpill:36,Ypill:434,limitPill:480},
    {Xpill:440,Ypill:434,limitPill:480},
    {Xpill:67,Ypill:400,limitPill:420},
    {Xpill:410,Ypill:400,limitPill:420},
    {Xpill:149,Ypill:400,limitPill:420},
    {Xpill:330,Ypill:400,limitPill:420},
    {Xpill:210,Ypill:450,limitPill:490},
    {Xpill:269,Ypill:450,limitPill:470},
  ];
};

Window.PillStorage.prototype = new Window.BaseStorage;
var pillStorage = new Window.PillStorage;


