import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../app/App';
import AuthService from './helpers/AuthService';

import HomePage from '../app/pages/HomePage';
import About from '../app/pages/About';

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

// const auth = new AuthService(appConfig.auth0_client_id, appConfig.auth0_domain);

const rerouteLoggedIn = (nextState, replace) => {
  if (AuthService.loggedIn()) {
    replace({ pathname: '/' });
  }
};

// checks if the passed in permission exists in the user's profile
const rerouteNotFound = (nextState, replace) => {
  replace({ pathname: '/notfound' });
};

// checks if the passed in permission exists in the user's profile
const confirmPermissions = permission => ((nextState, replace) => {
  const permissions = AuthService.getProfile().permissions;

  // if user doesn't have the permissions necessary to load this route, or is not logged in, redirect to '/'
  if ((permissions && permissions.indexOf(permission) === -1) || !AuthService.loggedIn()) {
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
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="about" component={About} title={'About'} />

    <Route path="facilities" component={FacilitiesLanding} title={'Facilities Explorer'} />
    <Route path="facilities/explorer" component={FacilitiesExplorer} title={'Facilities Explorer'} />
    <Route path="facility/:id" component={FacilityPage} title={'Facility Details'} />

    <Route path="pipeline" component={PipelineExplorer} title={'Housing Development Pipeline'} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="development/:id" component={DevelopmentPage} title={'Development Details'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="capitalprojects" component={CapitalProjects} title={'Capital Projects Explorer'} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="capitalproject/:id" component={ProjectPage} title={'Capital Project Details'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="capitalprojectsold" component={CapitalProjectsOld} title={'Capital Projects Explorer'} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="capitalprojectsold/:id" component={ProjectPageOld} title={'Capital Project Details'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="feedback/:type" component={FeedbackPage} title={'User Feedback'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="authsuccess" component={AuthSuccess} onEnter={rerouteLoggedIn} />
    <Route path="notfound" component={NotFound} />
    <Route path="*" onEnter={rerouteNotFound} />
  </Route>
);
