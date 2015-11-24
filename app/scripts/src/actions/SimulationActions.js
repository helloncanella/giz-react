import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var SimulationActions = {
  update: function(listOfBodies) {
    let data = {};
    data.listOfBodies = listOfBodies;

    let action = {
      type: Constants.UPDATE,
      data: _.assign({}, data)
    };
    AppDispatcher.handleAction(action);
  },

  insertBody: function(body){
    let data = {};
    data.body = body;

    let action = {
      type: Constants.NEW_BODY,
      data: _.assign({}, data)
    };
    AppDispatcher.handleAction(action);
  }
};

export default SimulationActions;
