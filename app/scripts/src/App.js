import Window from './Components/Window/Window';
import TimeController from './Components/TimeController/TimeController';

import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({
  render: function() {
    return (
      <div className='App'>
        <Window className='Simulation'/>
        <Window className='Data'/>
        <Window className='Graphic'/>
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('cointainer'));
