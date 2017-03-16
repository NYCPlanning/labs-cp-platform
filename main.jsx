import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import ReactGA from 'react-ga';

import routes from './app/routes';
import appConfig from './app/helpers/appConfig';

// initialize google analytics
ReactGA.initialize(appConfig.ga_tracking_code);

function fireTracking() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render( // eslint-disable-line no-undef
  <Router onUpdate={fireTracking} history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root'),
);
