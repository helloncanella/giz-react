import React from 'react';
import $ from 'jquery';
import Window from '../Window/Window';
import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

class DataTable extends React.Component {
  render () {
    return (
      <Window id={'DataTable'} label={'DATA TABLE'}>
        <div>Data</div>
      </Window>
    );
  }
}

export default DataTable;
