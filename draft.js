var startedWorker;
var startTime;
var number = 0;

function wakeWorker() {
  if (!startedWorker) {

    var worker = new Worker('scripts/dist/worker.js');

    worker.onmessage = function(e) {
      // console.log(e.data[0], e.data[1]);
    };

    setInterval(function() {

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
