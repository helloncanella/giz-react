import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import WarningStore from '../stores/WarningStore';

const STOPPED = 'stopped',
  RUNNING = 'running',
  PAUSED = 'paused';

var _runningState = STOPPED,
  _timeInterval = {},
  _ratio = 0,
  _duration,
  _pausedTime=0,
  _time;

var TimeControllerStore = _.assign({}, EventEmmitter.prototype, {

  getRunningState: function() {
    return _runningState;
  },

  getTimePosition: function() {
    return _ratio;
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

  dispatchToken: AppDispatcher.register(function(action) {
    AppDispatcher.waitFor([WarningStore.dispatchToken]);

    if (!WarningStore.getMessage()) {
      switch (action.type) {

        case Constants.STOP:
          _runningState = STOPPED;
          _ratio=0;
          break;

        case Constants.PLAY:
          _runningState = RUNNING;
          break;

        case Constants.PAUSE:
          _runningState = PAUSED;
          _pausedTime=_time;
          break;

        case Constants.SET_TIME_INTERVAL:
          _duration = action.duration*1000;
          break;

        case Constants.UPDATE:
          _time = action.data.time;
          _ratio = _time/_duration;

          if(_ratio>1){
            _ratio = 0;
            _runningState = STOPPED;
          }
          break;
        default:


      }
    }
    TimeControllerStore.emitChange();
  })
});

export default TimeControllerStore;
