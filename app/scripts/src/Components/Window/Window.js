import React from 'react';
import $ from 'jquery';
import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

class Window extends React.Component {
  componentDidMount () {
    $('.Window').resizable({handles: "all"}).draggable();
  }
  render () {
    return (
      <div className='Window'></div>
    );
  }
}

export default Window;
