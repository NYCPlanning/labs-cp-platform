import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import ReactGA from 'react-ga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';

import store from './store';
import routes from './routes';
import appConfig from './config/appConfig';

// initialize google analytics
ReactGA.initialize(appConfig.ga_tracking_code);

function fireTracking() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

// set material ui default styles
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#b1b1b1',
    accent1Color: '#D96B27',
  },
});

ReactDOM.render( // eslint-disable-line no-undef
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router onUpdate={fireTracking} history={browserHistory}>
        {routes}
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
