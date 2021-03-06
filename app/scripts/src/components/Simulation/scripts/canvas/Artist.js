import Stage from './Stage';
import ShapeFactory from './ShapeFactory';

function Artist(canvasId) {

  this.stage = new Stage(canvasId);

  var self = this;

  var shapeFactory = new ShapeFactory(canvasId, this.stage);

  this.draw = function() {
    var promise = new Promise(function(resolve) {
      shapeFactory.spawnShape().then(function(shape) {
        shape
          .prepare()
          .then(function(drawing) {
            drawing = self.finalize(drawing);
            resolve(drawing.data);
          });
      });
    });

    return promise;
  };

  this.finalize = function(drawing){

    drawing
      .setAABB()
      .setCentroid()
      .setListeners();

    return drawing;
  };

  this.update = function(bodyList) {
    var stage = this.stage;

    var children = stage.children;

    children.forEach(function(child,i){
      let body = bodyList[i];

      if(body){
        children[i].update(body);
      }

    });

    stage.update();
  };
}

export default Artist;
