import React from 'react';
import $ from 'jquery';
import 'jquery-ui/slider';
import TimeControllerActions from '../../actions/TimeControllerActions';

var lastProvidedPosition;

class Slider extends React.Component {
  componentDidMount () {
    $('.Slider').slider({
      value: this.props.timePosition*100,
      start: function(event,ui){
        lastProvidedPosition = ui.value;
      },
      slide: function(event,ui){
        TimeControllerActions.changeTime('moving');
      },
      stop: function(event, ui){
        if(lastProvidedPosition>ui.value){
          TimeControllerActions.changeTime('stop',ui.value);
        }
      }


    });
  }

  componentWillReceiveProps (nextProps) {
    var timePosition = nextProps.timePosition*100;
    $('.Slider').slider({
      value: timePosition,
    });
  }

  render () {
    return (
      <div className='Slider' id={this.props.id}></div>
    );
  }
}

export default Slider;
