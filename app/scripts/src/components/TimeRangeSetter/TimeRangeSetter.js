import React from 'react';
import $ from 'jquery';
import 'jquery-ui/resizable';
import 'jquery-ui/draggable';


class TimeRangeSetter extends React .Component {

  componentDidMount(){
    $('.TimeRangeSetter').draggable();
  }

  render () {
    return (
      <div className='TimeRangeSetter' id={this.props.id}>

      </div>
    );
  }
}

export default TimeRangeSetter;
