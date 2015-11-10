import React  from 'react';
import Button from '../Button/Button';
import Slider from '../Slider/Slider';
import TimeControllerActions from '../../actions/TimeControllerActions';

class TimeController extends React.Component {

  onStop(){
    TimeControllerActions.pressedStopButton();
  }

  onPlayOrPause (){
    TimeControllerActions.pressedPlayAndPauseButton();
  }

  render () {
    var fontAwesome = {
      PlayPause: (this.props.runningState === 'running') ? 'fa fa-pause' : 'fa fa-play'
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
