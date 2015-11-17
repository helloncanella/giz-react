import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var DataProcessorActions = {
  update: function(data) {
    let action = {
      type: Constants.UPDATE,
      data: _.assign({}, data)
    };
    AppDispatcher.handleAction(action);
  }
};

export default DataProcessorActions;
