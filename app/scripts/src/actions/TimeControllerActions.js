import AppDispatcher from '../dispatcher/AppDispatcher';
import TimeControllerConstants from '../constants/TimeControllerConstants';


var TimeControllerActions = {
  pressedStopButton: function() {
    AppDispatcher.handleAction({
      type: TimeControllerConstants.PRESSED_STOP_BUTTON,
      data:{}
    });
  },
  pressedPlayAndPauseButton: function() {
    AppDispatcher.handleAction({
      type: TimeControllerConstants.PRESSED_PLAYPAUSE_BUTTON,
      data:{}
    });
  }
};

export default TimeControllerActions;
