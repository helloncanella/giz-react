import React from 'react';

class Button extends React.Component {
  componentDidMount () {

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
