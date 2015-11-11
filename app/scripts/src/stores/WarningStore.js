import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import TimeControllerStore from '../stores/TimeControllerStore';

var _message = '', _timeInterval;

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

      case Constants.PRESSED_PLAYPAUSE_BUTTON:
        console.log(1);
        if(_.isEmpty(_.values(_timeInterval))){
          _message = 'You didn\'t set a time interval. Please, correct it.';
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
