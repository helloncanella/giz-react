import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import _ from 'lodash';


var TimeRangeSetterActions = {
  buttonPressed: function(intervalData) {
    AppDispatcher.handleAction({
      type: Constants.SET_TIME_INTERVAL,
      data:{
        interval: _.assign({},intervalData)
      }
    });
  }
};

export default TimeRangeSetterActions;
