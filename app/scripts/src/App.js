import $ from 'jquery';

import Window from './components/Window/Window';
import TimeRangeSetter from './components/TimeRangeSetter/TimeRangeSetter';
import TimeController from './components/TimeController/TimeController';

import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({render: function() {
    return (
      <div className='App'>
        <Window id={'Simulation'} label={'SIMULATION'}/>
        <Window id={'Data'} label={'DATA'}/>
        <Window id={'Graphic'} label={'CHART'}/>
        <TimeRangeSetter id={'TimeIntervalBox'} />
        <TimeController id={'TimeController'}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App/>, document.getElementById('cointainer'));
