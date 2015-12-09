import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var SimulationActions = {

  update: function(sentData) {

    let action = {
      type: Constants.UPDATE,
      data: _.assign({}, sentData)
    };
    AppDispatcher.handleAction(action);
  },

  insertBody: function(body, type){
    let data = {};
    data.body = body;
    data.type = type;

    let action = {
      type: Constants.NEW_BODY,
      data: _.assign({}, data)
    };
    AppDispatcher.handleAction(action);
  },

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

};

export default SimulationActions;
