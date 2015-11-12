import ViewDispatcher from '../dispatcher/ViewDispatcher';
import Constants from '../constants/AppConstants';


var WarningActions = {
  disableWarning: function() {
    ViewDispatcher.handleAction({
      type: Constants.DISABLE_WARNING,
    });
  }
};

export default WarningActions;
