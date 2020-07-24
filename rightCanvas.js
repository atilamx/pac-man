Window.rightCanvas = Window.ScreenCanvas.clone();
Window.rightCanvas.init({
    context: Window.InitializeCanvas('myCanvas3').context,
    color:'orange',
    speed: 3
  }
);
