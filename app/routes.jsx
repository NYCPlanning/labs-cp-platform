import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../app/App';
import Login from '../app/pages/Login';
import Signup from '../app/pages/Signup';
import AuthService from './helpers/AuthService';
import AuthHelper from './helpers/AuthHelper';
import appConfig from './helpers/appConfig';

import HomePage from '../app/pages/HomePage';

import FacilitiesLanding from '../app/facilities/LandingPage';
import FacilitiesExplorer from '../app/facilities/Explorer';
import FacilityPage from '../app/facilities/DetailPage';

import PipelineExplorer from '../app/pipeline/Explorer';
import DevelopmentPage from '../app/pipeline/DetailPage';

import CapitalProjects from '../app/capitalprojects/Explorer';
import ProjectPage from '../app/capitalprojects/DetailPage';

import CapitalProjectsOld from '../app/capitalprojectsold/Explorer';
import ProjectPageOld from '../app/capitalprojectsold/ProjectPage';

import FeedbackPage from '../app/pages/FeedbackPage';

import NotFound from '../app/pages/NotFound';

const auth = new AuthService(appConfig.auth0_client_id, appConfig.auth0_domain);

// redirects a route to /login if the user is not logged in
const requireAuth = (nextState, replace) => {
  auth.requestedURL = nextState.location.pathname;

  if (!AuthHelper.loggedIn()) {
    replace({
      pathname: '/login',
      state: {
        previousPath: nextState.location.pathname,
      },
    });
  }
};

const rerouteLoggedIn = (nextState, replace) => {
  if (AuthHelper.loggedIn()) {
    replace({ pathname: '/' });
  }
};

// checks if the passed in permission exists in the user's profile
const rerouteNotFound = (nextState, replace) => {
  replace({ pathname: '/notfound' });
};

// checks if the passed in permission exists in the user's profile
const confirmPermissions = permission => ((nextState, replace) => {
  // If not logged in, redirect. TODO can this use rerouteLoggedIn() so we are not repeating code?
  if (!AuthHelper.loggedIn()) {
    replace({
      pathname: '/login',
      state: {
        previousPath: nextState.location.pathname,
      },
    });
  }

  const permissions = AuthHelper.getProfile().permissions;

  if (permissions.indexOf(permission) === -1) {
    // if trying to load homepage, reroute to facilities, else reroute to not found
    if (nextState.location.pathname === '/') {
      replace({ pathname: '/facilities' });
    } else {
      replace({ pathname: '/notfound' });
    }
  }
});

// dummy component for the authsuccess route
const AuthSuccess = () => (
  <div />
);

module.exports = (
  <Route path="/" component={App} auth={auth} >
    <IndexRoute component={HomePage} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="facilities" component={FacilitiesLanding} onEnter={requireAuth} />
    <Route path="facilities/explorer" component={FacilitiesExplorer} title={'Facilities Explorer'} onEnter={requireAuth} />
    <Route path="facility/:id" component={FacilityPage} title={'Facility Details'} onEnter={requireAuth} />

    <Route path="pipeline" component={PipelineExplorer} title={'Housing Development Pipeline'} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="development/:id" component={DevelopmentPage} title={'Development Details'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="capitalprojects" component={CapitalProjects} title={'Capital Projects Explorer'} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="capitalproject/:id" component={ProjectPage} title={'Capital Project Details'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="capitalprojectsold" component={CapitalProjectsOld} title={'Capital Projects Explorer'} onEnter={requireAuth} />
    <Route path="capitalprojectsold/:id" component={ProjectPageOld} title={'Capital Project Details'} onEnter={requireAuth} />

    <Route path="feedback/:type" component={FeedbackPage} title={'User Feedback'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="login" component={Login} onEnter={rerouteLoggedIn} />
    <Route path="93f8c022f7434327b0ae4d9361cbfcb9" component={Signup} />
    <Route path="authsuccess" component={AuthSuccess} onEnter={rerouteLoggedIn} />
    <Route path="notfound" component={NotFound} />
    <Route path="*" onEnter={rerouteNotFound} />
  </Route>
);
