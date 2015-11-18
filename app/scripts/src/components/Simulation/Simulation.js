import React from 'react';
import $ from 'jquery';
import Window from '../Window/Window';
import Artist from './scripts/Artist';
import Converter from './scripts/Converter';
import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

var listOfDraw;
var selectedBody;

class Simulation extends React.Component {

  componentDidMount () {
    this.canvasId = 'easeljs';
    this.scale = 100;
    this.artist = new Artist(this.canvasId);

    this.canvas = $('#' + this.canvasId);
    this.stage = this.artist.stage;
    this.converter = new Converter(this.scale);

    this.readyToDraw();
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
