import React from 'react';
import $ from 'jquery';
import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

import TimeRangeSetterActions from'../../actions/TimeRangeSetterActions';

class TimeRangeSetter extends React.Component {

  componentDidMount () {
    $('.TimeRangeSetter').draggable();
    $('input').keypress(function (e) {
      var key = String.fromCharCode(e.which);
      if(!((/(\.|\d)/).test(key))){
        e.preventDefault();
      }
    });
  }

  componentDidUpdate(){
    if(!this.props.isVisible){
      $('.TimeRangeSetter').css('display','none');
    }
  }


  onClick() {
    let interval = {
      start: +$('input#start-time').val(),
      end: +$('input#end-time').val()
    };

    TimeRangeSetterActions.buttonPressed(interval);
  }

  render () {
    return (
      <div className='TimeRangeSetter' id={this.props.id}>
        <h5>Set the time interval</h5>
        <form className='form-inline'>
          <div className='form-group'>
            <label htmlFor='start-time'>start time</label>
            <input className='form-control' id='start-time'></input>
          </div>
          <div className='form-group'>
            <label htmlFor='end-time'>end time</label>
            <input className='form-control' id='end-time'></input>
          </div>
        </form>
        <button onClick={this.onClick}>OK</button>
      </div>
    );
  }
}

export default TimeRangeSetter;
