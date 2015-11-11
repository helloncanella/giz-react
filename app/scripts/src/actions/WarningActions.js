import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';


var WarningActions = {
  disableWarning: function() {
    AppDispatcher.handleAction({
      type: Constants.DISABLE_WARNING,
    });
  }
};

export default WarningActions;
