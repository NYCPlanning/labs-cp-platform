import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import ReactGA from 'react-ga';

import routes from './app/routes';

// initialize google analytics
ReactGA.initialize('UA-84250233-2');

function fireTracking() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}


ReactDOM.render(
  <Router onUpdate={fireTracking} history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root'),
);
