Window.SoundEffects = (function (){
  var ghostHeadCount = 0;
  var pacmanDying = false;
  var startGame = function(){
    var isStartMusicoff = true,
        musicAtStart = document.getElementById('pacman_song1');

    var playStartMusic = function(){
      musicAtStart.play();
    };

    musicAtStart.addEventListener('ended', function(){
      isStartMusicoff = false;
      window.globalConstants.stopCharacters = false;
      Window.Texts.eraseGetReady();
      Window.SoundEffects.startBackgroundSound();
      }, false);

    return function(){
      return {play: playStartMusic,playing: isStartMusicoff}
    }
  }();

  var eatenSound = function(){
    var count        = 0,
        myAudio      = document.getElementById('pacman_coinin'),
        myAudio2     = myAudio.cloneNode(),
        myAudio3     = myAudio.cloneNode(),
        audioStorage = [myAudio,myAudio2,myAudio3];

     return function (){
       count === 3 ? count = 0 : count;
       audioStorage[count++].play();
     };
  }();

  var eatFruit = function(){
    var myAudio = document.getElementById('well_done2');

    myAudio.addEventListener('ended', function () {
      window.globalConstants.stopCharacters = false;
    }, false);

    return function(){
      myAudio.play();
    }
  }();

  var bigeatenSound = function(){
    var atomicTransaction = false,
        myAudio = document.getElementById('pacman_power1');


    myAudio.addEventListener('play', function () {
      atomicTransaction = true;
      Window.EventsObserver.event(this,function(){
        return {chasemode: true}
      });
    }, false);

    myAudio.addEventListener('ended', function () {
      atomicTransaction = false;
      /*
       *it ended lets reset the ghost score
       * Start the background sound now :)
       */
      ghostHeadCount = 0;
      BackgroundSound("start");
      myAudio.currentTime = 0;
      Window.EventsObserver.event(this,function(){
        return {chasemode: false}
      });
    }, false);

    return function (length){
      if(length == 'stop'){
        myAudio.pause();
        myAudio.currentTime = 0;
        return
      }
      if(length == 'pause'){
        myAudio.currentTime > 0 ? myAudio.pause(): true;
        return
      }
      if(length == 'start'){
        myAudio.currentTime > 0 ? myAudio.play() : true
        return
      }
      if(length){
        return myAudio
      }

      /*
      * Use an atomic transaction when the sound is playing, if you
      * happen to eat a big pill while the effect of the first one is not over yet
      * rewind sound
      */
      if(!atomicTransaction) {
        myAudio.play();
        BackgroundSound("stop")
      } else {
        myAudio.currentTime = 0;
        myAudio.play();
      }
    };
  }();

  var BackgroundSound = function(){
    var myAudio = document.getElementById('backgrond1');

    return function(control,velocity){
      if(control === "stop"){
        myAudio.pause();
      } else {
        if (control == "increase"){
          //increase velocity
          myAudio.playbackRate = velocity;
        }
        myAudio.loop = true;
        myAudio.play();
      }
    }
  }();

  var brutality = function(){
    var myAudio = document.getElementById('brutality');

    return function(){
      myAudio.play();
    }
  }();

  var ghostEaten = function(){
    var count      = 0,
      myAudio      = document.getElementById('pacman_getghost'),
      myAudio2     = myAudio.cloneNode(),
      myAudio3     = myAudio.cloneNode(),
      myAudio4     = myAudio.cloneNode(),
      audioStorage = [myAudio,myAudio2,myAudio3,myAudio4];

      for (var i = 0; i < audioStorage.length; i++) {
        audioStorage[i].addEventListener('ended', function () {
          window.globalConstants.slowVelocity = 2;
          if (ghostHeadCount > 600 ){
            ghostHeadCount = 0;
            brutality();
          }
          Window.EventsObserver.event(this,function(Type){
            if(Type === "Pacman"){
              return true;
            }
          });
        }, false);
        audioStorage[i].addEventListener('play', function () {
          window.globalConstants.slowVelocity = 100;
          Window.EventsObserver.event(this,function(Type){
            if(Type === "Pacman"){
              return false;
            }
          });
        }, false);
      }

      function incrementScoreByGhostDead(){
        //increment until 200,400,600,800
        window.globalConstants.score += ghostHeadCount += 200;
      }

    return function(){
      count === 4 ? count = 0 : count;
      incrementScoreByGhostDead();
      audioStorage[count++].play();
    }
  }();

  var pacmanEaten = function(){
    var myAudio = document.getElementById('pacman_death');
    //Restart characters positions

    myAudio.addEventListener('ended', function (){
      window.globalConstants.stopCharacters = false;
      pacmanDying = false;
      //window.globalConstants.getReady = false
      Window.EventsObserver.event(
        {id:'pacmanIsDead'},
         function(obj){
         }
      );

      lifesStorage.get().length == 0 ? window.globalConstants.gameOver = true : true

      if(!window.globalConstants.gameOver){
        Window.Texts.eraseGetReady();
      } else {
        Window.Texts.eraseGetReady();
        Window.Texts.drawGameOver();
        //last but not least laugh
        window.globalConstants.level < 1 ? laugh() : true;
        BackgroundSound('stop');
      }
    });

    myAudio.addEventListener('play', function () {
      pacmanDying = true;
      window.globalConstants.gameOver ? Window.Texts.drawGameOver() : Window.Texts.drawGetReady();
    });

    return function(){
      myAudio.play();
    }
  }();

  var clearSound = function(){
    var myAudio = [
      document.getElementById('exellent'),
      document.getElementById('superv'),
      document.getElementById('outstanding'),
      document.getElementById('well_done'),
      document.getElementById('flawless'),
    ];

    var counter = 0;

    function nextAudioIndex(){
      var count = counter < 3 ? counter++ : counter = 0;
      var flawlessIndex = 4;
      return lifesStorage.getKilles() < 1 ? flawlessIndex : count ;
    }

    for (var i = 0; i < 5; i++) {
      myAudio[i].addEventListener('play', function () {
        nextLevelTrasition('start');
      });

      myAudio[i].addEventListener('ended', function () {
        nextLevelTrasition('stop');
      });
    }

    function nextLevelTrasition(action){
      if(action == "start"){
        window.globalConstants.stopCharacters = true;
        window.globalConstants.newLevel = true;
        bigeatenSound('stop');
        context.beginPath();
        context.fillStyle = 'black';
        context.fillRect(0, 0, 490, 600);
        Window.EventsObserver.event(
          {id:'goInvisible'},
          function(obj){
          }
        );

        Window.Texts.drawNextLevel();
        BackgroundSound('stop');
      } else {
        pillStorage.clearCount();
        window.globalConstants.newLevel = false;
        window.globalConstants.stopCharacters = false;
        Window.Texts.eraseGetReady()
        window.globalConstants.gameFrameVelocity -= 1;
        var interval = Window.clockInterrupt.get('interval');
        //Clear all intervals
        for (var i = 0; i <100;i++)
          window.clearInterval(i);

        Window.EventsObserver.event({id:'pacman_power1'},function(){
          return {chasemode: false}
        });

        setInterval(Window.Mainloop.run, window.globalConstants.gameFrameVelocity);
        Window.SoundEffects.incrementBackgroundSoundVelocity(1)
        BackgroundSound('start');
        lifesStorage.resetKilledTimes();
        Window.Observer.clear();
        Window.fruitsController.clear();
        Window.fruitsController.incrementFruit();

      }

    }

    return function(){
      window.globalConstants.level++;
      myAudio[nextAudioIndex()].play();
    }
  }();

  var addLife = function(){
    var myAudio = document.getElementById('extralife')

    return function(){
      myAudio.play();
    }
  }();

  var laugh = function(){
    var myAudio = document.getElementById('laugh')

    return function(){
      myAudio.play();
    }
  }();

  var BackgroundSoundVelocity = function(velocity){
    BackgroundSound('increase',velocity)
  }

  var pause = function(action){

    if(!window.globalConstants.gameOver && !window.globalConstants.newLevel && !pacmanDying){
        if(action) {
          BackgroundSound('stop');
          bigeatenSound('pause');
        } else {
          if (!startGame().playing) {
            BackgroundSound('start');
            bigeatenSound('start');
          }
        }

    }
  }

  return {
    eatenPill: function (pill){
      window.globalConstants.score += 10;
      pill.bigPill ? bigeatenSound() : eatenSound();
    },
    startBackgroundSound: function(){
      BackgroundSound();
    },
    getSound: function(sound){
      return bigeatenSound(sound);
    },
    ghostHasBeenEaten: ghostEaten,
    pacmanHasBeenEaten: pacmanEaten,
    getGhostScore: function(){
     return ghostHeadCount;
    },
    getColorFromSoundPostion: function(part){
      var audio = bigeatenSound('algo');

      if(part === 'eye' || part === 'mouth' ){
        return (
          (audio.currentTime * 1000000 > 3519352) && (audio.currentTime * 1000000 < 4000000) ||
          (audio.currentTime * 1000000 > 4519352) && (audio.currentTime * 1000000 < 5000000) ||
          (audio.currentTime * 1000000 > 5519352) && (audio.currentTime * 1000000 < 6000000) ||
          (audio.currentTime * 1000000 > 6519352) && (audio.currentTime * 1000000 < 7000000) ||
          (audio.currentTime * 1000000 > 7519352) && (audio.currentTime * 1000000 < 7900000) ||
          (audio.currentTime * 1000000 > 7900000) && (audio.currentTime * 1000000 < 8020000)
            ? 'red' : 'white')
      } else{
        return (
            (audio.currentTime * 1000000 > 3519352) && (audio.currentTime * 1000000 < 4000000) ||
            (audio.currentTime * 1000000 > 4519352) && (audio.currentTime * 1000000 < 5000000) ||
            (audio.currentTime * 1000000 > 5519352) && (audio.currentTime * 1000000 < 6000000) ||
            (audio.currentTime * 1000000 > 6519352) && (audio.currentTime * 1000000 < 7000000) ||
            (audio.currentTime * 1000000 > 7519352) && (audio.currentTime * 1000000 < 7900000) ||
            (audio.currentTime * 1000000 > 7900000) && (audio.currentTime * 1000000 < 8020000)
              ? 'white' : 'blue')
      }
    },
    startGameSound: startGame,
    clearLevelSound: clearSound,
    addLife: addLife,
    laugh: laugh,
    eatFruit: eatFruit,
    incrementBackgroundSoundVelocity: BackgroundSoundVelocity,
    pauseAll: pause,
}
})();

console.log("Sound effects loaded...")
;
