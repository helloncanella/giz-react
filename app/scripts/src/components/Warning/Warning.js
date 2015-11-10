import React from 'react';
import $ from 'jquery';


class Warning extends React.Component {

  onClick(){
    $('.Warning').css('display','none');
  }

  render () {
    return (
      <div className='Warning'>
        <h2>Warning</h2>
        <div className='message'>{this.props.message}</div>
        <button onClick={this.onClick}>OK</button>
      </div>
    );
  }

}

export default Warning;
