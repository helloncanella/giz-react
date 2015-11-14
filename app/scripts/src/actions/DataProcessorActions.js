import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var DataProcessorActions = {
  turnOn: function() {
    AppDispatcher.handleAction({type: Constants.TURN_ON_DATA_PROCESSOR});
  },
  turnOff: function() {
    AppDispatcher.handleAction({type: Constants.TURN_OFF_DATA_PROCESSOR});
  }
};

export default DataProcessorActions;
