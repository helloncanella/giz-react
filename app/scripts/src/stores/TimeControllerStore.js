import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import TimeControllerConstants from '../constants/TimeControllerConstants';

const
  STOPPED = 'stopped',
  RUNNING = 'running',
  PAUSED = 'paused';

var _runningState = STOPPED,
  _timePosition = 0;

var TimeControllerStore = _.assign({}, EventEmmitter.prototype, {

  getRunningState: function() {
    return _runningState;
  },

  getTimePosition: function() {
    return _timePosition;
  },

  emitChange: function(argument) {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register(function(action) {
  let constants = TimeControllerConstants;

  switch (action.type) {

    case constants.PRESSED_STOP_BUTTON:
      _runningState = STOPPED;
      break;

    case constants.PRESSED_PLAYPAUSE_BUTTON:
      if (_runningState == PAUSED) {
        _runningState = RUNNING;
      } else {
        _runningState = PAUSED;
      }
      break;

    default:
  }

  TimeControllerStore.emitChange();

});

export default TimeControllerStore;
