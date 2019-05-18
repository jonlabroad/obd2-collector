import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { PlotDashboardState } from './types';
import { AnyARecord } from 'dns';
import { updateData } from './reducers';
import DashboardContainer from './containers/DashboardContainer';

const store = createStore<PlotDashboardState, AnyARecord, any, any>(
    updateData,
    undefined
);

ReactDOM.render(<DashboardContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
