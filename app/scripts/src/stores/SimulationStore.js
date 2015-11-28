import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import SimulationActions from '../actions/SimulationActions';
import WarningStore from '../stores/WarningStore';

import work from 'webworkify';
import Worker from '../components/Simulation/scripts/physics/Worker';

var startTime;
var number = 0;
var dataGeneration;
var _duration = {};
var pastTime = [0];
var duration;
var step = 300;
var next,
  index;
var bodyList = {};
var timeline = new Map();

var worker = work(Worker);
worker.addEventListener('message', function(e) {
  SimulationActions.update(JSON.parse(JSON.stringify(e.data)));
});

function wakeWorkerAtIndex(desiredPosition) {
  dataGeneration = setInterval(function() {
    let nextTime;

    if (pastTime[desiredPosition + 1]) {
      nextTime = pastTime[desiredPosition + 1];
    } else {
      nextTime = pastTime[desiredPosition] + step;
      pastTime.push(nextTime);
    }

    desiredPosition++;
    index = desiredPosition;

    let ratio = nextTime / duration;

    if (ratio <= 0.95) {SimulationActions.update({time: nextTime});} else {stopWorker();}
  }, step);

}

function stopWorker() {
  index = 0;
  pauseWorker();
}

function pauseWorker() {
  clearInterval(dataGeneration);
}

function stop() {
  worker.postMessage(["stop"]);
}

function play() {
  worker.postMessage(["play"]);
}

var SimulationStore = _.assign({}, EventEmmitter.prototype, {

  emitChange: function(argument) {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  getBodyList: function() {
    return bodyList;
  },

  dispatchToken: AppDispatcher.register(function(action) {

    AppDispatcher.waitFor([WarningStore.dispatchToken]);
    if (!WarningStore.getMessage()) {
      switch (action.type) {
          case Constants.NEW_BODY:
          let body = action.data.body;
          worker.postMessage(['insertBody', body, 'dynamic',]);
          break;
        case Constants.PLAY:
          // if(!index){
          //   index = 0;
          // }
          // wakeWorkerAtIndex(index);
          play();
          break;
        case Constants.UPDATE:

          let data = action.data,
            time = data.time;

          bodyList = data.bodyList;
          timeline.set(time, bodyList);

          break;
        case Constants.PAUSE:
        case Constants.STOP:
          stop();
          break;
        case Constants.SET_TIME_INTERVAL:
          _duration = (action.duration+1)*1000;          
          break;
        default:
      }
    }
  })

});

export default SimulationStore;
