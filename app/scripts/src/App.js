import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import Window from './components/Window/Window';
import TimeRangeSetter from './components/TimeRangeSetter/TimeRangeSetter';
import TimeController from './components/TimeController/TimeController';
import Warning from './components/Warning/Warning';

import TimeControllerStore from './stores/TimeControllerStore';
import WarningStore from './stores/WarningStore';


function getAppStates() {
  return ({
    TimeController:{
      runningState: TimeControllerStore.getRunningState(),
      timePosition: TimeControllerStore.getTimePosition(),
    },
    Warning: {
      message:WarningStore.getMessage()
    }
  });
}

var self;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = getAppStates();
    console.log(this.state);
    self = this;
  }

  componentDidMount () {
    TimeControllerStore.addChangeListener(this._onChange);
    WarningStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    TimeControllerStore.removeChangeListener(this._onChange);
    WarningStore.removeChangeListener(this._onChange);
  }

  render () {
    var TimeControllerStates= this.state.TimeController;
    var WarningStates= this.state.Warning;


    return (
      <div className='App'>
        <Window id={'Simulation'} label={'SIMULATION'}/>
        <Window id={'Data'} label={'DATA'}/>
        <Window id={'Graphic'} label={'CHART'}/>
        <Warning message={WarningStates.message} />
        <TimeRangeSetter id={'TimeIntervalBox'}/>
        <TimeController id={'TimeController'} runningState={TimeControllerStates.runningState} timePosition={TimeControllerStates.timePosition}/>
      </div>
    );
  }

  _onChange () {
    self.setState(getAppStates());
    console.log(self.state);
  }

}



ReactDOM.render(<App/>, document.getElementById('cointainer'));
