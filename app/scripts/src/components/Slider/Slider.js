import React from 'react';
import $ from 'jquery';
import 'jquery-ui/slider';


class Slider extends React.Component {
  componentDidMount () {
    $('.Slider').slider();
  }
  render () {
    return (
      <div className='Slider' id={this.props.id}></div>
    );
  }
}

export default Slider;
