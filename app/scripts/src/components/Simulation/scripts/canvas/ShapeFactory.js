import $ from 'jquery';
import Circle from '../canvas/Circle';
import Polyline from '../canvas/Polyline';

function ShapeFactory(canvasId, stage) {

  this.stage = stage;

  var canvas = $('#' + canvasId);

  var borders = {
    x: [
      0, canvas.width(),
    ],
    y: [0, canvas.height(),]
  };

  stage.enableMouseOver(10);

  this.isClosed = false;



  this.spawnShape = function() {
    var circleProcess,
      incresingOfRadius;

    let closeToBorder;

    var shapeFactory = this;

    var promise = new Promise(function(resolve, reject) {

      //-------------------------------------------------------------
      // SHAPE'S CREATION RULE
      //
      // - if the mousedown's time is greater than a certain amount,
      // create a Circle.
      //
      // - if it is short, create a Polyline.
      //-------------------------------------------------------------

      var shape,
        firstPoint;

      canvas.on({
        mousedown: function(e) {

          closeToBorder = false;

          let cursor = {
            x: e.offsetX,
            y: e.offsetY
          };

          //Auxiliary function
          var verifyProximity = function(cursor) {
            return function(border) {
              if (!closeToBorder) {
                closeToBorder = (10 > Math.abs(cursor - border))? true : false;
              }
            };
          };

          //Verifying if cursor is close to canvasBorder
          for (var i in borders) {
            if (borders.hasOwnProperty(i)) {borders[i].forEach(verifyProximity(cursor[i]));}
          }


          if (!closeToBorder) {
            firstPoint = {
              x: cursor.x,
              y: cursor.y
            };

            circleProcess = setTimeout(function() {
              var radius = 0;
              shape = new Circle(firstPoint, 0, shapeFactory);
              stage.addChild(shape);
              incresingOfRadius = setInterval(function() {
                shape.increaseRadius();
                stage.update();
              }, 1);
            }, 500);

            //- preventing the mousedown to fire multiple times
            canvas.unbind('mousedown'); //HACK
          }
        },

        mouseup: function(event) {

          if (!closeToBorder) {
            clearTimeout(circleProcess);
            clearInterval(incresingOfRadius);

            if (!shape) {
              shape = new Polyline(firstPoint, canvas, shapeFactory);
              stage.addChild(shape);
              shape.start(firstPoint, 7.5);
            }

            stage.update();
            resolve(shape);
          }
        }
      });

    });
    return promise;
  };
}

ShapeFactory.prototype.turnOn = function() {
  this.isClosed = false;
};

ShapeFactory.prototype.turnOff = function() {
  this.isClosed = true;
};

export default ShapeFactory;
