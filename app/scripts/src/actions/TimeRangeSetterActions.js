import ViewDispatcher from '../dispatcher/ViewDispatcher';
import Constants from '../constants/AppConstants';
import _ from 'lodash';


var TimeRangeSetterActions = {
  buttonPressed: function(intervalData) {
    ViewDispatcher.handleAction({
      type: Constants.INTERVAL_SETTER_BUTTON_PRESSED,
      interval: _.assign({},intervalData)
    });
  }
};

export default TimeRangeSetterActions;
