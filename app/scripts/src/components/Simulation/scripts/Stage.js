var EaseljsStage = createjs.Stage;

function Stage(canvasId) {
  EaseljsStage.call(this, canvasId);

}

Stage.prototype = Object.create(EaseljsStage.prototype);

Stage.prototype.constructor = Stage;

Stage.prototype.setSelectedChild = function(child) {
  this.selectedChild = child;
};

Stage.prototype.rescaleChildren =  function(ratio){
  let children = this.children;

  for (var index in children) {
    if (children.hasOwnProperty(index)) {
      var child = children[index];
      child.graphics.clear();
      child.rescale(ratio);
    }
  }

  this.update();

};

export default Stage;
