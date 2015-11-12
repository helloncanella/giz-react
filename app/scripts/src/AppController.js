import React from 'react';
import ReactDOM from 'react-dom';
import AppView from '../src/AppView';
import AppModel from '../src/AppModel';

var startedWorker;

if(!startedWorker){
  AppModel.wakeWorker();
  startedWorker = true;
}




ReactDOM.render(<AppView/>, document.getElementById('cointainer'));
