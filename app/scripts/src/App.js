import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import Window from './components/Window/Window';
import TimeRangeSetter from './components/TimeRangeSetter/TimeRangeSetter';
import TimeController from './components/TimeController/TimeController';

import TimeControllerStore from './stores/TimeControllerStore';

function getAppStates() {
  return ({
    runningState: TimeControllerStore.getRunningState(),
    timePosition: TimeControllerStore.getTimePosition()
  });
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = getAppStates();
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
        <TimeRangeSetter id={'TimeIntervalBox'}/>
        <TimeController id={'TimeController'} runningState={this.state.runningState} timePosition={this.state.timePosition}/>
      </div>
    );
  }

  _onChange () {
    this.setState(getAppStates());
  }

}



ReactDOM.render(<App/>, document.getElementById('cointainer'));
