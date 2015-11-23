var scripts = [
  '../physics/Box2dWeb-2.1.a.3.js',
  '../physics/poly2tri.min.js',
  '../physics/box2d-preamble.js',
  'triangulator.js',
  'physics.js',
  'fixtureFactory.js',
  'box2dClosedPolyline.js',
  'box2dOpenedPolyline.js',
  'box2dCircle.js',
];

scripts.forEach(function(script){
  console.log(script);
  importScripts(script);
});
