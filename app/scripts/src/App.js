import Window from './Components/Window/Window';
import TimeController from './Components/TimeController/TimeController';

import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Window/>
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('main'));
