Window.leftCanvas = Window.ScreenCanvas.clone();
Window.leftCanvas.init({
    context: Window.InitializeCanvas('myCanvas2').context,
    color: 'lightgreen',
    speed:  1
  }
);
