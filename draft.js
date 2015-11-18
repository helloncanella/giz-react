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


import React from 'react';
import $ from 'jquery';
import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

class Window extends React.Component {
  componentDidMount () {
    $('.Window').resizable({handles: "all"}).draggable({handle:'header'});
  }
  render () {
    return (
      <div className='Window' id={this.props.id}>
        <header>
          <span className='label'>{this.props.label}</span>
          <button className='minimizer'><i className="fa fa-minus"></i></button>
        </header>
      </div>
    );
  }
}

export default Window;


import React from 'react';

import $ from 'jquery';

import Window from './components/Window/Window';
import TimeRangeSetter from './components/TimeRangeSetter/TimeRangeSetter';
import TimeController from './components/TimeController/TimeController';
import Warning from './components/Warning/Warning';

import TimeControllerStore from './stores/TimeControllerStore';
import TimeRangeSetterStore from './stores/TimeRangeSetterStore';
import WarningStore from './stores/WarningStore';


function getAppStates() {
  return ({
    TimeController:{
      runningState: TimeControllerStore.getRunningState(),
      timePosition: TimeControllerStore.getTimePosition(),
    },
    Warning: {
      message:WarningStore.getMessage()
    },
    TimeRangeSetter: {
      isVisible: TimeRangeSetterStore.isVisible()
    }
  });
}



var self;

class AppView extends React.Component {
  constructor(props){
    super(props);
    this.state = getAppStates();
    self = this;
  }

  componentDidMount () {
    TimeControllerStore.addChangeListener(this._onChange);
    WarningStore.addChangeListener(this._onChange);
    TimeRangeSetterStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    TimeControllerStore.removeChangeListener(this._onChange);
    WarningStore.removeChangeListener(this._onChange);
    TimeRangeSetter.removeChangeListener(this._onChange);
  }

  render () {
    var TimeControllerStates= this.state.TimeController;
    var WarningStates= this.state.Warning;
    var TimeRangeSetterStates = this.state.TimeRangeSetter;

    console.log(TimeRangeSetterStates.isVisible);

    return (
      <div className='App'>
        <Window id={'Simulation'} label={'SIMULATION'}/>
        <Window id={'Data'} label={'DATA'}/>
        <Window id={'Graphic'} label={'CHART'}/>
        <Warning message={WarningStates.message} />
        <TimeRangeSetter id={'TimeIntervalBox'} isVisible={TimeRangeSetterStates.isVisible}/>
        <TimeController id={'TimeController'} runningState={TimeControllerStates.runningState} timePosition={TimeControllerStates.timePosition}/>
      </div>
    );
  }

  _onChange () {
    self.setState(getAppStates());
  }

}

export default AppView;



