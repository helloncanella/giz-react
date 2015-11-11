import React from 'react';
import $ from 'jquery';
import WarningActions from '../../actions/WarningActions';


class Warning extends React.Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.message !== ''){
      $('.Warning').css('display','block');
    }
  }

  onClick(){
    $('.Warning').css('display','none');
    WarningActions.disableWarning();
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
