import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import _ from 'lodash';


var TimeRangeSetterActions = {
  buttonPressed: function(duration) {
    AppDispatcher.handleAction({
      type: Constants.SET_TIME_INTERVAL,
      duration: duration
    });
  }
};

export default TimeRangeSetterActions;
