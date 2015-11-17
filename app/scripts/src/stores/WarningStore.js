import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var _message = '', _timeInterval={}, _intervalAccepted=false;

var WarningStore = _.assign({}, EventEmmitter.prototype, {

  getMessage: function() {
    return _message;
  },

  getTimeInterval: function () {
    return _timeInterval;
  },

  verifyTimeIntervalAcceptance:  function() {
    return _intervalAccepted;
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
        if(_.isEmpty(_.values(_timeInterval))){
          _message = 'You didn\'t set a time interval. Please, correct it.';
        }
        break;
      case Constants.SET_TIME_INTERVAL:
        let interval = action.data.interval, start = interval.start, end = interval.end;
        if(start>end || start==end){
          _intervalAccepted = false;
          _message='The initial time value must be greater than the final';
        }else{
          _intervalAccepted = true;
          _timeInterval = interval;
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
