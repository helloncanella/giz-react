import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import DataProcessorActions from '../actions/DataProcessorActions';

var startedWorker;
var startTime;
var number = 0;
var dataGeneration;

function wakeWorker() {
  if (!startedWorker) {

    var worker = new Worker('scripts/dist/worker.js');

    worker.onmessage = function(e) {
      console.log(e.data[0], e.data[1]);
    };

    dataGeneration = setInterval(function() {

      worker.postMessage([time(), number,]);
      number++;

      function time() {
        if (!startTime) {
          startTime = Date.now();
        }

        return Date.now() - startTime;
      }

    }, 1000);

    startedWorker = true;
  }
}

function sleepWorker(){
  clearInterval(dataGeneration);
}


var DataProcessorStore = _.assign({}, EventEmmitter.prototype, {

  dispatchToken: AppDispatcher.register(function(action) {

    switch (action.type) {
      case Constants.TURN_ON_DATA_PROCESSOR:
        wakeWorker();
        break;
      case Constants.TURN_OFF_DATA_PROCESSOR:
        console.log('ok');
        sleepWorker();
        break;
      default:
    }
  })

});

export default DataProcessorStore;
