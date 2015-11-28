import React from 'react';

import $ from 'jquery';

import Simulation from './components/Simulation/Simulation';
import DataTable from './components/DataTable/DataTable';
import Chart from './components/Chart/Chart';
import TimeRangeSetter from './components/TimeRangeSetter/TimeRangeSetter';
import TimeController from './components/TimeController/TimeController';
import Warning from './components/Warning/Warning';

import TimeControllerStore from './stores/TimeControllerStore';
import TimeRangeSetterStore from './stores/TimeRangeSetterStore';
import SimulationStore from './stores/SimulationStore';
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
    },
    Simulation:{
      listOfBodies: SimulationStore.getBodyList()
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
    SimulationStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    TimeControllerStore.removeChangeListener(this._onChange);
    WarningStore.removeChangeListener(this._onChange);
    TimeRangeSetterStore.removeChangeListener(this._onChange);
    SimulationStore.removeChangeListener(this._onChange);
  }

  render () {
    var TimeControllerStates= this.state.TimeController;
    var WarningStates= this.state.Warning;
    var TimeRangeSetterStates = this.state.TimeRangeSetter;
    var SimulationStoreStates = this.state.Simulation;


    return (
      <div className='App'>
        <Warning message={WarningStates.message}/>
        <Simulation listOfBodies={SimulationStoreStates.listOfBodies}/>
        <TimeController id={'TimeController'} runningState={TimeControllerStates.runningState} timePosition={0} />
        <TimeRangeSetter id={'TimeRangeSetter'} isVisible={TimeRangeSetterStates.isVisible}/>
      </div>
    );
  }

  _onChange () {
    self.setState(getAppStates());
  }

}

export default AppView;
