import React from 'react';
import $ from 'jquery';
import Window from '../Window/Window';
import Artist from './scripts/canvas/Artist';
import Converter from './scripts/Converter';
import Limit from './scripts/canvas/Limit';

import SimulationActions from '../../actions/SimulationActions';

import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

var width,
  ratio,
  rescaling,
  listOfBodies,
  paused,
  listOfDraw;
var listOfDraw;

class Simulation extends React.Component {

  setBorders() {
    var canvasWidth = this.canvas.width();
    var canvasHeight = this.canvas.height();

    var bottom = new Limit({
      x: 10,
      y: canvasHeight - 10
    }, canvasWidth - 10, 10);
    var left = new Limit({
      x: 0, y: 0
    }, 10, canvasHeight);
    var right = new Limit({
      x: (canvasWidth - 10),
      y: 0
    }, 10, canvasHeight);

    var limits = [bottom, left, right,];

    var self = this;


    limits.forEach(function(limit) {
      self.stage.addChild(limit);
      limit = self.artist.finalize(limit);
      self.stage.update();

      var convertedShape = self.converter.convert(limit.data, 'box2d');

      SimulationActions.insertBody(convertedShape, 'static');
    });
  }

  componentDidMount () {
    let self = this;

    this.canvasId = 'easeljs';
    this.scale = 100;
    this.converter = new Converter(this.scale);

    //canvas's characters
    this.canvas = $('#' + this.canvasId);
    this.setupCanvas();
    this.artist = new Artist(this.canvasId);
    this.stage = this.artist.stage;

    this.setBorders();

    this.readyToDraw();

    $('#Simulation').on({
      resize: function() {
        SimulationActions.pause();
        self.setupCanvas();
        self.stage.update();
      },
      resizestart: function() {
        width = $('#Simulation').width();
        rescaling = setInterval(function() {
          ratio = $('#Simulation').width() / width;
          self.stage.rescaleChildren(ratio);
          self.scale = self.scale * ratio;
          width = $('#Simulation').width();
        }, 10);
      },
      resizestop: function() {
        clearInterval(rescaling);
        console.log(self.scale);
        self.converter.modifyScale(self.scale);
        // SimulationActions.play();
      }
    });

    //updating canvas.
    (function update(){
      if (listOfDraw && !paused) {self.artist.update(listOfDraw);}
      requestAnimationFrame(update); //ESSENTIAL!
    })();

  }

  componentWillUpdate (nextprops) {
    listOfBodies = JSON.parse(JSON.stringify(nextprops.listOfBodies));
    listOfDraw = this.converter.convert(listOfBodies, 'canvas', 'angle');
    paused = nextprops.paused;
  }

  setupCanvas () {this.canvas.attr({width: $('#Simulation').css('width'), height: $('#Simulation').css('height')});}

  readyToDraw () {
    let self = this;
    this.artist.draw().then(function(shape) {

      let clonedShape = JSON.parse(JSON.stringify(shape));
      let convertedShape = self.converter.convert(clonedShape, 'box2d');

      SimulationActions.insertBody(convertedShape, 'dynamic');

      self.readyToDraw();
    });
  }

  render () {
    return(
      <Window id={'Simulation'} label={'SIMULATION'}>
        <canvas id='easeljs'></canvas>
      </Window>
    );
  }
}

export default Simulation;
