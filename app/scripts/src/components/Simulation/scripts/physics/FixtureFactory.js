import B2Preamble from './B2Preamble';

function FixtureFactory () {
  this.spawn = function (shape,density,friction) {
    var fixture = new B2Preamble.b2FixtureDef();
    fixture.friction = friction;
    fixture.density = density;

    switch (shape) {
      case 'polygon':
        fixture.shape = new B2Preamble.b2PolygonShape();
        break;
      case 'circle':
        fixture.shape = new B2Preamble.b2CircleShape();
        break;
      default:
    }

    return fixture;
  };
}

export default FixtureFactory;
