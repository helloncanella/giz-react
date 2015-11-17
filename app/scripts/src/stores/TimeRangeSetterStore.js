import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import WarningStore from '../stores/WarningStore';

var _isVisible = true;

var TimeControllerStore = _.assign({}, EventEmmitter.prototype, {

  isVisible: function() {
    return _isVisible;
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
          _isVisible = true;
          break;

          case Constants.PLAY:
            if(_isVisible){
              _isVisible = false;
            }
            break;

        case Constants.SET_TIME_INTERVAL:
          let timeInterval = action.data.interval;
          let duration = (timeInterval.end -timeInterval.start)*1000;

          if(duration>0){
            _isVisible = false;
          }
          break;

        default:
      }
    }
    TimeControllerStore.emitChange();
  })
});

export default TimeControllerStore;
