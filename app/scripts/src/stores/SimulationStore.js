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
var duration = {};
var pastTime = [0];
var duration;
var step = 300;
var next,
  time,
  index;
var bodyList = {};
var timeline = new Map();
var last;

var worker = work(Worker);

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
  pauseWorker();
}

function pauseWorker() {
  clearInterval(dataGeneration);
}

function stop() {
  worker.postMessage(["stop"]);
}

function wakeWorker() {
  worker.postMessage(["play"]);
}

function run() {
  wakeWorker();
}

function update(data) {
  SimulationActions.update(JSON.parse(JSON.stringify(data)));
}

worker.addEventListener('message', function(e) {
  if(e.data.bodyList){
    update(e.data);
  }

});

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
          case Constants.NEWBODY:
          let body = action.data.body;
          worker.postMessage(['insertBody', body, 'dynamic',]);
          break;
        case Constants.PLAY:
          run();
          break;
        case Constants.UPDATE:
          let data = action.data,
            time = data.time;
          if (time > duration) {stop();} else {
            bodyList = data.bodyList;
            timeline.set(time, bodyList);
          }
          break;

        case Constants.PAUSE:
        case Constants.STOP:
          stop();
          break;
        case Constants.SET_TIME_INTERVAL:
          duration = action.duration *1000;
          break;
        case Constants.SLIDED_MOVED:

          switch (action.state) {
            case 'moving':
              stop();
              break;
            case 'stop':
              let data;

              if (duration) {
                console.log('action.percentual',action.percentual);
                time = action.percentual/100 * duration;
                timeline.forEach(function(value, key) {
                  if (!last) {
                    last = key;
                  } else {
                    if (time > last && key > time) {
                      data = {
                        time: key,
                        bodyList: value
                      };
                    }
                    last = key;
                  }

                  if(data){
                    debugger;
                    update(data);
                    data = {
                      time: key,
                      bodyList: value
                    };
                  }


                });
              }
              break;
            default:

          }





          break;
        default:
      }
    }
  })

});

export default SimulationStore;
