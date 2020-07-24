/* this module is a graph builder that will attempt to automatically
 * walk in the maze and map all the coordinates and gaps, once that the map is ready
 * it could be used by the ghosts to chase pacman properly and more acurately
 * than the current slow algorithms :(
 *
 */


Window.GraphConstructor = (function(){
  var characterArray = [];
  var direction = 'right';
  var incrix = 0, incriy = 0;
  var intx, inty;
  var roundRect = function (x, y, w, h, r,color) {

    context.lineWidth   =  2;
    context.strokeStyle = color || 'blue';

    //if (w < 2 * r) r = w / 2;
    //if (h < 2 * r) r = h / 2;
    context.beginPath();
    context.moveTo(x+r, y);
    context.arcTo(x+w, y,   x+w, y+h, r);
    context.arcTo(x+w, y+h, x,   y+h, r);
    context.arcTo(x,   y+h, x,   y,   r);
    context.arcTo(x,   y,   x+w, y,   r);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
    context.stroke();
    context.restore();
  }

  return {
    characterCoordinate: function(){
      return {getCurrentCoordinates: function(){ return [intx,inty]}}
    },
   characterDirection: function(){
     return direction;
   },
    mapTheMazeSurface: function(){

      //Window.Labyrinth.getLimitRanges()
      var rangess  = 0,
        ranges   = 0,
        context = Window.myCanvas.context;



      context.lineWidth   = 2;
      context.strokeStyle = 'green';

//      rangess = [{ node: 'A', ix: 35,  iy: 35,  fx:35, fy: 35,  vertices: ['A','B','C'] },
//                 { node: 'B', ix: 35,  iy: 35,  fx:100, fy: 35, vertices: ['A','J','H'] },
//                 { node: 'C', ix: 35,  iy: 35,  fx:35, fy: 81,  vertices: ['A','F','D'] },
//                 { node: 'D', ix: 35,  iy: 81,  fx:35, fy: 120,  vertices: ['C','G'] },
//                 { node: 'F', ix: 35,  iy: 81,  fx:100, fy: 81,  vertices: ['C','B','G','H'] },
//                 { node: 'G', ix: 35,  iy: 120,  fx:100, fy: 120,  from: ['F','D'] },
//                 { node: 'F->B', ix: 100,  iy: 120,  fx:100, fy: 35,  vertices: ['C','B','G','H'] },
//                 { node: 'H', ix: 100,  iy: 81,  fx:145, fy: 81,  vertices: ['F'] },
//                ]


      Window.Labyrinth.checkHotAreas(this).temperature

      ranges = {ix:35,iy:35}
      while(true){

        context.beginPath();


        context.lineWidth   = 2;
        context.strokeStyle = 'green';
        context.moveTo(intx, inty )
        intx = ranges['ix'] + (incrix);
        inty = ranges['iy'] + (incriy);
       // if(i>200){
        //  debugger;
       // }

       if( Window.Labyrinth.checkHotAreas(this).temperature){

         roundRect(intx + 1 ,inty, 2, 2, 0, "red");
         direction = "down"
         //debugger;
         break
       }

        if (direction == "right"){
          incrix++;
        }

        if (direction == "down"){
          incriy++
        }

        if (direction == "left"){
          incrix--
        }

        if (direction == "up"){
          incriy--
        }

        context.lineTo(intx, inty);
        //context.lineTo(232, inty + (incriy));
        context.stroke();
        //(x, y, w, h, r)

        Window.Labyrinth.checkHotAreas(this)
      }
    }
  }
})();
