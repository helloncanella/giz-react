import React from 'react';
import Button from '../Button/Button';
import Slider from '../Slider/Slider';

class TimeController extends React.Component {

  render () {
    return (
      <div className='TimeController' id={this.props.id}>
        <Button id={'PlayPause'} fontAwesome={'fa fa-play'}/>
        <Button id={'Stop'} fontAwesome={'fa fa-stop'} />
        <Slider id={'TimeFlow'}/>
      </div>
    );
  }
}

export default TimeController;
