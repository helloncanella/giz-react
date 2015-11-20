import React from 'react';
import ReactDOM from 'react-dom';
import AppView from '../src/AppView';
import DataGeneratorStore from './stores/SimulationStore';
import SimulationActions from '../src/actions/SimulationActions';


ReactDOM.render(<AppView/>, document.getElementById('cointainer'));
