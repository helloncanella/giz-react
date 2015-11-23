import React from 'react';
import $ from 'jquery';
import Window from '../Window/Window';
import Artist from './scripts/canvas/Artist';
import Converter from './scripts/Converter';
import work from 'webworkify';
import mico from './scripts/worker';

import SimulationActions from '../../actions/SimulationActions';

import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

var width,
  ratio,
  rescaling;

var listOfDraw;

class Simulation extends React.Component {

  componentDidMount() {
    this.canvasId = 'easeljs';
    this.scale = 100;
    this.converter = new Converter(this.scale);

    //canvas's characters
    this.canvas = $('#' + this.canvasId);
    this.setupCanvas();
    this.artist = new Artist(this.canvasId);
    this.stage = this.artist.stage;

    var w = work(mico);
    w.addEventListener('message', function(e) {
      console.log(e.data);
    });

    w.postMessage(4); // send the worker a message

    this.readyToDraw();

    let self = this;
    $('#Simulation').on({
      resize: function() {
        self.setupCanvas();
        self.stage.update();
      },
      resizestart: function() {
        width = $('#Simulation').width();

        rescaling = setInterval(function() {
          ratio = $('#Simulation').width() / width;
          self.stage.rescaleChildren(ratio);
          width = $('#Simulation').width();
        }, 10);
      },
      resizestop: function() {
        clearInterval(rescaling);
        this.scale /= ratio;
      }
    });
  }

  setupCanvas () {this.canvas.attr({width: $('#Simulation').css('width'), height: $('#Simulation').css('height')});}

  readyToDraw () {
    let self = this;
    this.artist.draw().then(function(shape) {

      let clonedShape = JSON.parse(JSON.stringify(shape));
      let convertedShape = self.converter.convert(clonedShape, 'box2d');

      this.worker.postMessage(['insertBody', convertedShape, 'dynamic',]);

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
