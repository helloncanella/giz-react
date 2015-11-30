import B2Preamble from './B2Preamble';
import Physics from './Physics';
import _ from 'lodash';

module.exports = function(self) {
  var mouseJoint,
    indexSelectedBody,
    indexLastBody,
    position,
    mousePosition,
    bodyList,
    engine,
    selectedBody;

  var gravity = new B2Preamble.b2Vec2(0, 9.8),
    world = new B2Preamble.b2World(gravity, false),
    physics = new Physics(world),
    rate = 1 / 60,
    interval = 1000 * rate,
    time = 0;

  self.onmessage = function(e) {

    var message = e.data[0];

    switch (message) {

      case 'insertBody':
        var convertedShape = e.data[1];
        var type = e.data[2];

        physics.insertIntoWorld(convertedShape, type);
        break;

      case 'moveBody':
        var indexSelectedBody = e.data[1],
          position = e.data[2];

        if (!mouseJoint) {
          var body = getBodyAtMouse(position);
          var md = new B2Preamble.b2MouseJointDef();

          md.bodyA = world.GetGroundBody();
          md.bodyB = body;
          md.target.Set(position.x, position.y);
          md.m_collideConnected = true;
          md.maxForce = 300.0 * body.GetMass();

          mouseJoint = world.CreateJoint(md);
          body.SetAwake(true);
        } else {mouseJoint.SetTarget(new B2Preamble.b2Vec2(position.x, position.y));}
        break;

      case 'destroyJoint':
        if (mouseJoint) {
          world.DestroyJoint(mouseJoint);
          mouseJoint = null;
        }
        break;

      case 'play':
        engine = setInterval(function() {
          world.Step(rate, 10, 10);
          bodyList = physics.getCustomListOfBodies();

          if (!_.isEmpty(bodyList)) {
            time += interval;

            let result = {
              time: time,
              bodyList: bodyList
            };



            self.postMessage(result);
          }

        }, interval);
        break;

      case 'stop':
        clearInterval(engine);
        self.postMessage({time:0});
        break;
      case 'pause':
        clearInterval(engine);
        break;
      default:
    }

  };

  function getBodyAtMouse(position) {
    mousePosition = new B2Preamble.b2Vec2(position.x, position.y);

    var aabb = new B2Preamble.b2AABB();

    aabb.lowerBound.Set(position.x - 0.001, position.y - 0.001);
    aabb.upperBound.Set(position.x + 0.001, position.y + 0.001);

    // Query the world for overlapping shapes.
    selectedBody = null;
    world.QueryAABB(getBodyCB, aabb);

    return selectedBody;
  }

  function getBodyCB(fixture) {
    if (fixture.GetBody().GetType() !== B2Preamble.b2Body.b2_staticBody) {
      if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePosition)) {
        selectedBody = fixture.GetBody();
        return false;
      }
    }
    return true;
  }

};
