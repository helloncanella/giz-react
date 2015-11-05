import React from 'react';
import $ from 'jquery';
import 'jquery-ui/slider';


class TimeFlow extends React.Component {
  componentDidMount () {
    $('.TimeFlow').slider();
  }
  render () {
    return (
      <div className='TimeFlow'></div>
    );
  }
}

export default TimeFlow;
