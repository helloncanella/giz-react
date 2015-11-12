import ViewDispatcher from '../dispatcher/ViewDispatcher';
import Constants from '../constants/AppConstants';


var TimeControllerActions = {
  pressedStopButton: function() {
    ViewDispatcher.handleAction({
      type: Constants.PRESSED_STOP_BUTTON,
      data:{}
    });
  },
  pressedPlayAndPauseButton: function() {
    ViewDispatcher.handleAction({
      type: Constants.PRESSED_PLAYPAUSE_BUTTON,
      data:{}
    });
  }
};

export default TimeControllerActions;
