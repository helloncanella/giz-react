var startTime, number = 0;

var AppModel  = {
  wakeWorker:function(){
    var worker = new Worker('scripts/dist/worker.js');

    worker.onmessage = function(e){
      // console.log(e.data[0], e.data[1]);
    };

    setInterval(function(){
      worker.postMessage([AppModel.time(),number]);
      number++;
    },1000);

  },
  time: function(){
    if(!startTime){
      startTime = Date.now();
    }

    return Date.now() - startTime;
  }
};


export default AppModel;
