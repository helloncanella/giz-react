import Shape from './Shape';
import Polyline from './Polyline';

function Limit(position, width, height) {
  Shape.call(this, position);

  this.data = {
    label: 'polyline',
    measures: {
      points: [{
        x: position.x,
        y: position.y
      }, {
        x: position.x,
        y: position.y + height
      }, {
        x: position.x + width,
        y: position.y + height
      }, {
        x: position.x + width,
        y: position.y
      }],
    },
    centroid: {
      x: position.x + width/2,
      y: position.y + height/2
    },
    opened: false
  };

  var graphics = this.graphics;

  graphics.beginFill('green');

}


Limit.prototype = Object.create(Shape.prototype);

Limit.prototype.constructor = Limit;

Limit.prototype.setCentroid = function(){
  Polyline.prototype.setCentroid.call(this);
  return this;
};

export default Limit;
