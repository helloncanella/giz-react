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
