var EventEmmitter = require('events');
var _ = require('lodash');

const
  STOPPED = 'stopped',
  RUNNING = 'running',
  PAUSED = 'paused';

var
  _runningState = STOPPED,
  _timePosition = 0;

var TimeControllerStore = _.assign({}, EventEmmitter.prototype, {

  getRunningState: function() {
    return _runningState;
  },

  getTimePosition: function () {
    return _timePosition;
  },

  emitChange: function(argument) {
    this.emit('change');
  },

  addChangeListener: function (callback){
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

export default TimeControllerStore;
