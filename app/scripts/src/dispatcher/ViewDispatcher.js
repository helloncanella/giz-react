import Flux from 'flux';
var Dispatcher = Flux.Dispatcher;

var ViewDispatcher = new Dispatcher();

ViewDispatcher.handleAction = function (action) {
  this.dispatch(action);
};

export default ViewDispatcher;
