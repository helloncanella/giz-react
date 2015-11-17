import React from 'react';
import $ from 'jquery';
import 'jquery-ui/slider';


class Slider extends React.Component {
  componentDidMount () {
    $('.Slider').slider({
      value: this.props.timePosition*100,
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
