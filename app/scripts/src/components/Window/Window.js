import React from 'react';
import $ from 'jquery';
import 'jquery-ui/resizable';
import 'jquery-ui/draggable';

class Window extends React.Component {
  componentDidMount () {
    $('.Window').resizable({handles: "all"}).draggable();
  }
  render () {
    return (
      <div className='Window' id={this.props.id}>
        <header>
          <span className='label'>{this.props.label}</span>
          <button className='minimizer'><i className="fa fa-minus"></i></button>
        </header>
      </div>
    );
  }
}

export default Window;
