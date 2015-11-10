import React from 'react';
import Button from '../Button/Button';
import Slider from '../Slider/Slider';

class TimeController extends React.Component {

  onStop(){

  }

  onPlayOrPause (){
    
  }

  render () {

    var fontAwesome = {
      PlayPause: (this.props.runnningState === 'paused') ? 'fa fa-pause' : 'fa fa-play'
    };

    return (
      <div className='TimeController' id={this.props.id}>
        <Button id={'PlayPause'} fontAwesome={fontAwesome.PlayPause} callback={this.onPlayOrPause}/>
        <Button id={'Stop'} fontAwesome={'fa fa-stop'} callback={this.onStop}/>
        <Slider id={'TimeFlow'} timePosition={this.props.timePosition}/>
      </div>
    );
  }
}

export default TimeController;
