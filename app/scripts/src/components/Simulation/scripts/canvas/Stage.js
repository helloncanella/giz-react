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
      children[index].rescale(ratio);
    }
  }

  this.update();

};

export default Stage;
