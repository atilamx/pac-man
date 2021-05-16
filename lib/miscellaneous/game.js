//Start game
Window.keyEventsObserver.init();

Window.Mainloop.createCharacters();

Window.Mainloop.registerCharacters();

Window.Mainloop.registerEngines();

Window.Mainloop.setupPlaneCoordinates();

Window.clockInterrupt.set('delay', window.globalConstants.gameFrameVelocity);

Window.clockInterrupt.startClock();


