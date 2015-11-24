import React from 'react';
import $ from 'jquery';
import Window from '../Window/Window';
import Artist from './scripts/canvas/Artist';
import Converter from './scripts/Converter';



import SimulationActions from '../../actions/SimulationActions';

import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

var width,
  ratio,
  rescaling;

var listOfDraw;

class Simulation extends React.Component {

  componentDidMount() {
    let self = this;

    this.canvasId = 'easeljs';
    this.scale = 100;
    this.converter = new Converter(this.scale);

    //canvas's characters
    this.canvas = $('#' + this.canvasId);
    this.setupCanvas();
    this.artist = new Artist(this.canvasId);
    this.stage = this.artist.stage;





    this.readyToDraw();

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

  componentWillUpdate(nextprops){

  }

  setupCanvas () {this.canvas.attr({width: $('#Simulation').css('width'), height: $('#Simulation').css('height')});}

  readyToDraw () {
    let self = this;
    this.artist.draw().then(function(shape) {

      let clonedShape = JSON.parse(JSON.stringify(shape));
      let convertedShape = self.converter.convert(clonedShape, 'box2d');

      SimulationActions.insertBody(convertedShape);

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
