import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';



var TimeControllerActions = {
  pressedStopButton: function() {
    AppDispatcher.handleAction({
      type: Constants.PRESSED_STOP_BUTTON,
      data:{}
    });
  },
  pressedPlayAndPauseButton: function() {
    AppDispatcher.handleAction({
      type: Constants.PRESSED_PLAYPAUSE_BUTTON,
      data:{}
    });
  }
};

export default TimeControllerActions;
