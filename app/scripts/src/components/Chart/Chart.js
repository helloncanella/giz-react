import React from 'react';
import $ from 'jquery';
import Window from '../Window/Window';
import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

class Chart extends React.Component {
  render () {
    return (
      <div className='Chart'>
        <Window id={'Chart'} label={'CHART'}>
          <div>Data</div>
        </Window>
      </div>
    );
  }
}

export default Chart;
