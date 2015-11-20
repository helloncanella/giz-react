import React  from 'react';
import Button from '../Button/Button';
import Slider from '../Slider/Slider';
import TimeControllerActions from '../../actions/TimeControllerActions';
import SimulationActions from '../../actions/SimulationActions';

class TimeController extends React.Component {

  stop(){
    TimeControllerActions.stop();
  }

  play (){
    TimeControllerActions.play();
  }

  pause (){
    TimeControllerActions.pause();
  }

  render () {
    var fontAwesome = {
      PlayPause: (this.props.runningState === 'running') ? 'fa fa-pause' : 'fa fa-play'
    };

    var playPauseCallback = (this.props.runningState === 'running')? this.pause : this.play;

    return (
      <div className='TimeController' id={this.props.id}>
        <Button id={'PlayPause'} fontAwesome={fontAwesome.PlayPause} callback={playPauseCallback}/>
        <Button id={'Stop'} fontAwesome={'fa fa-stop'} callback={this.stop}/>
        <Slider id={'TimeFlow'} timePosition={this.props.timePosition}/>
      </div>
    );
  }
}

export default TimeController;
