import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import Window from './components/Window/Window';
import TimeRangeSetter from './components/TimeRangeSetter/TimeRangeSetter';
import TimeController from './components/TimeController/TimeController';
import Warning from './components/Warning/Warning';

import TimeControllerStore from './stores/TimeControllerStore';


function getAppStates() {
  return ({
    runningState: TimeControllerStore.getRunningState(),
    timePosition: TimeControllerStore.getTimePosition()
  });
}

var self;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = getAppStates();
    self = this;
  }

  componentDidMount () {
    TimeControllerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    TimeControllerStore.removeChangeListener(this._onChange);
  }

  render () {
    return (
      <div className='App'>
        <Window id={'Simulation'} label={'SIMULATION'}/>
        <Window id={'Data'} label={'DATA'}/>
        <Window id={'Graphic'} label={'CHART'}/>
        <Warning message={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '}/>
        <TimeRangeSetter id={'TimeIntervalBox'}/>
        <TimeController id={'TimeController'} runningState={this.state.runningState} timePosition={this.state.timePosition}/>
      </div>
    );
  }

  _onChange () {
    self.setState(getAppStates());
  }

}



ReactDOM.render(<App/>, document.getElementById('cointainer'));
