import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import _ from 'lodash';


var TimeRangeSetterActions = {
  buttonPressed: function(intervalData) {
    AppDispatcher.handleAction({
      type: Constants.INTERVAL_SETTER_BUTTON_PRESSED,
      interval: _.assign({},intervalData)
    });
  }
};

export default TimeRangeSetterActions;
