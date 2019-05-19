import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { PlotDashboardState } from './types';
import { AnyARecord } from 'dns';
import { updateData } from './reducers';
import DashboardContainer from './containers/DashboardContainer';
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Provider } from 'react-redux';

const store = createStore<PlotDashboardState, AnyARecord, any, any>(
    updateData,
    undefined
);

const theme = createMuiTheme({
    palette: {
      primary: red,
      secondary: {
        main: '#d32f2f',
        dark: '#d32f2f',
      },
      type: 'dark',
    },
  });

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Provider store={store}>
            <DashboardContainer />
          </Provider>
        </CssBaseline>
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
