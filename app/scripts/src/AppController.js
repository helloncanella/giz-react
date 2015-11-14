import React from 'react';
import ReactDOM from 'react-dom';
import AppView from '../src/AppView';
import DataGeneratorStore from './stores/DataProcessorStore';
import DataProcessorActions from '../src/actions/DataProcessorActions';


DataProcessorActions.turnOn();
ReactDOM.render(<AppView/>, document.getElementById('cointainer'));
