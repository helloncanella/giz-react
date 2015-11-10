import React from 'react';
import $ from 'jquery';

class Button extends React.Component {
  componentDidMount () {
    var self = this;
    $('#'+this.props.id).click(function () {
      self.props.callback();
    });
  }
  render () {
    return (
      <div className='Button' id={this.props.id}>
        <i className={this.props.fontAwesome}></i>
      </div>
    );
  }
}

export default Button;
