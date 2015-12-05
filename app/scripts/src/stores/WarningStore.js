import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var _duration, _message = '', _intervalAccepted=false;

var WarningStore = _.assign({}, EventEmmitter.prototype, {

  getMessage: function() {
    return _message;
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

    switch (action.type) {

      case Constants.PLAY:
        if(!_duration){
          // _message = 'You didn\'t set a time interval. Please, correct it.';
        }
        break;
      case Constants.SET_TIME_INTERVAL:
        _duration = action.duration;
        if(_duration){
          _message = '';
        }
        break;
      default:
        _message = '';
        break;
    }

    WarningStore.emitChange();
  }),



});



export default WarningStore;
