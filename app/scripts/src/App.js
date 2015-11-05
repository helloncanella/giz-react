import Window from './Components/Window/Window';
import TimeController from './Components/TimeController/TimeController';

import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({
  render: function() {
    return (
      <div className='App'>
        <Window className='Simulation' label={'SIMULATION'}/>
        <Window className='Data' label={'DATA'}/>
        <Window className='Graphic' label={'GRAPHIC'}/>
        <TimeController />
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('cointainer'));
