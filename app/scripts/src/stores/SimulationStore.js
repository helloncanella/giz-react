import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import SimulationActions from '../actions/SimulationActions';

import WarningStore from '../stores/WarningStore';

var startTime;
var number = 0;
var dataGeneration;
var _timeIntervalObject ={};
var pastTime = [0];
var duration;
var step = 300;
var next, index;

function wakeWorkerAtIndex(desiredPosition) {
  dataGeneration = setInterval(function () {
    let nextTime;

    if(pastTime[desiredPosition+1]){
      nextTime = pastTime[desiredPosition+1];
    }else{
      nextTime = pastTime[desiredPosition]+step;
      pastTime.push(nextTime) ;
    }

    desiredPosition++;
    index = desiredPosition;

    let ratio = nextTime/duration;

    if(ratio<=0.95){
      SimulationActions.update({time: nextTime});
    }else{
      stopWorker();
    }
  }, step);

}

function stopWorker() {
  index = 0;
  pauseWorker();
}

function pauseWorker(){
  clearInterval(dataGeneration);
}

var SimulationStore = _.assign({}, EventEmmitter.prototype, {

  dispatchToken: AppDispatcher.register(function(action) {

    AppDispatcher.waitFor([WarningStore.dispatchToken]);
    if (!WarningStore.getMessage()) {
      switch (action.type) {
        case Constants.PLAY:
          if(!index){
            index = 0;
          }
          wakeWorkerAtIndex(index);
          break;
        case Constants.PAUSE:
          pauseWorker();
          break;
        case Constants.STOP:
          stopWorker();
          break;
        case Constants.SET_TIME_INTERVAL:
          _timeIntervalObject= action.data.interval;
          duration = (_timeIntervalObject.end-_timeIntervalObject.start + 1)*1000;
          break;
        default:
      }
    }
  })

});

export default SimulationStore;
