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
    let displayValue = this.props.isVisible ? 'block' : 'none';
    $('.TimeRangeSetter').css('display',displayValue);
  }


  onClick() {
    let duration = +$('input#duration').val();
    TimeRangeSetterActions.buttonPressed(duration);
  }

  render () {
    return (
      <div className='TimeRangeSetter' id={this.props.id}>
        <h5>Set the duration</h5>
        <form className='form-inline'>
          <div className='form-group'>
            <label htmlFor='duration'>duration</label>
            <input className='form-control' id='duration'></input>
          </div>
        </form>
        <button onClick={this.onClick}>OK</button>
      </div>
    );
  }
}

export default TimeRangeSetter;
