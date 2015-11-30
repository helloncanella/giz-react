import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var TimeControllerActions = {
  play: function() {
    AppDispatcher.handleAction({
      type: Constants.PLAY,
      data:{}
    });
  },
  pause: function() {
    AppDispatcher.handleAction({
      type: Constants.PAUSE,
      data:{}
    });
  },
  stop: function() {
    AppDispatcher.handleAction({
      type: Constants.STOP,
      data:{}
    });
  },
  changeTime: function(handlerState,percentual) {
    AppDispatcher.handleAction({
      type: Constants.SLIDED_MOVED,
      percentual:percentual,
      state:handlerState
    });
  },
};

export default TimeControllerActions;
