import _ from 'lodash';
import EventEmmitter from 'events';

import ViewDispatcher from '../dispatcher/ViewDispatcher';
import Constants from '../constants/AppConstants';

import WarningStore from '../stores/WarningStore';

const STOPPED = 'stopped',
  RUNNING = 'running',
  PAUSED = 'paused';

var _runningState = STOPPED,
  _timePosition = 0,
  _timeInterval = {};

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
  },

  dispatchToken: ViewDispatcher.register(function(action) {
    ViewDispatcher.waitFor([WarningStore.dispatchToken]);

    if (!WarningStore.getMessage()) {
      switch (action.type) {

        case Constants.PRESSED_STOP_BUTTON:
          _runningState = STOPPED;
          break;

        case Constants.PRESSED_PLAYPAUSE_BUTTON:

          if (_runningState == PAUSED || _runningState == STOPPED) {
            _runningState = RUNNING;
          } else {
            _runningState = PAUSED;
          }
          break;

        case Constants.INTERVAL_SETTER_BUTTON_PRESSED:
          _timeInterval = action.interval;
          console.log(_timeInterval);
          break;
        default :
        }
      }
      TimeControllerStore.emitChange();
    }
  ),

});

export default TimeControllerStore;
