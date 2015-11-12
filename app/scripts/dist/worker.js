/*jshint -W020*/

onmessage = function(e) {
  var processedNumber, time = e.data[0], number = e.data[1];

  processedNumber = number*2;

  postMessage([time, processedNumber]);
};
