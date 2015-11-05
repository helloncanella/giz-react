import React from 'react';
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton';
import TimeFlow from '../TimeFlow/TimeFlow';

class TimeController extends React.Component {
  componentDidMount () {

  }
  render () {
    return (
      <div className='TimeController'>
        <PlayPauseButton/>
        <TimeFlow/>
      </div>
    );
  }
}

export default TimeController;
