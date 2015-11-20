import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var SimulationActions = {
  update: function(data) {
    let action = {
      type: Constants.UPDATE,
      data: _.assign({}, data)
    };
    AppDispatcher.handleAction(action);
  }
};

export default SimulationActions;
