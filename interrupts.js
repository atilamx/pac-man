
Window.clockInterrupt = {
  delay: 300,
  interval: null,

  set: function (operation, value){
    this[operation] = value
  },

  get: function(operation, value){
    return this[operation]
  },

  startClock: function(){
   /*
    * Run only once when the game stars
    */
    Window.SoundEffects.startGameSound().play();
    Window.Texts.drawGetReady();
    this.interval = setInterval(Window.Mainloop.run, this.delay);
  }
}
;
