import React from 'react';
import $ from 'jquery';
import Window from '../Window/Window';
import Artist from './scripts/Artist';
import Converter from './scripts/Converter';
import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

var width, ratio;

class Simulation extends React.Component {

  componentDidMount () {
    this.canvasId = 'easeljs';
    this.scale = 100;

    this.canvas = $('#' + this.canvasId);
    this.setupCanvas();
    this.artist = new Artist(this.canvasId);
    this.stage = this.artist.stage;
    this.converter = new Converter(this.scale);

    this.readyToDraw();

    let self = this;
    $('#Simulation').on({
      resize: function() {
        self.setupCanvas();
        self.stage.update();
      },
      resizestart: function(){
        width=$('#Simulation').width();
      },
      resizestop: function(){
        ratio = $('#Simulation').width()/width;
        self.stage.rescaleChildren(ratio);
      },
    });
  }

  setupCanvas () {
    this.canvas.attr({width: $('#Simulation').css('width'), height: $('#Simulation').css('height')});
  }

  readyToDraw () {
    let self = this;
    this.artist.draw().then(function(shape) {

      let clonedShape = JSON.parse(JSON.stringify(shape));
      let convertedShape = self.converter.convert(clonedShape, 'box2d');
      self.readyToDraw();
    });
  }

  render () {
    return (
      <Window id={'Simulation'} label={'SIMULATION'}>
        <canvas id='easeljs'></canvas>
      </Window>
    );
  }
}

export default Simulation;
