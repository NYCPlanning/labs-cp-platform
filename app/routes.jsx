import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from '../app/App';
import AuthService from './helpers/AuthService';
import Login from '../app/pages/Login';

import HomePage from '../app/pages/HomePage';
import { About, AboutFacilities, AboutPipeline, AboutCapitalProjects } from '../app/pages/About';

import FacilitiesLanding from '../app/facilities/LandingPage';
import FacilitiesExplorer from '../app/facilities/Explorer';
import FacilityPage from '../app/facilities/DetailPage';

import PipelineExplorer from '../app/pipeline/Explorer';
import DevelopmentPage from '../app/pipeline/DetailPage';

import CapitalProjectsLanding from '../app/capitalprojects/LandingPage';
import CapitalProjectsExplorer from '../app/capitalprojects/Explorer';
import CapitalProjectsTable from '../app/capitalprojects/Table';
import ProjectPage from '../app/capitalprojects/DetailPage';

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
      replace({
        pathname: '/login',
        state: {
          targetPath: nextState.location.pathname,
        },
      });
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
    <Route path="about/facilities" component={AboutFacilities} title={'About'} />
    <Route path="about/pipeline" component={AboutPipeline} title={'About'} />
    <Route path="about/capitalprojects" component={AboutCapitalProjects} title={'About'} />

    <Route path="facilities" component={FacilitiesLanding} title={'Facilities Explorer'} about={'/about/facilities'} />
    <Route path="facilities/explorer" component={FacilitiesExplorer} title={'Facilities Explorer'} about={'/about/facilities'} />
    <Route path="facility/:id" component={FacilityPage} title={'Facility Details'} about={'/about/facilities'} />

    <Redirect from="pipeline" to="pipeline/explorer" />
    <Route path="pipeline/explorer" component={PipelineExplorer} title={'Housing Development Pipeline'} about={'/about/pipeline'} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="development/:id" component={DevelopmentPage} title={'Development Details'} about={'/about/pipeline'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="capitalprojects" component={CapitalProjectsLanding} title={'NYC Capital Projects Explorer'} about={'/about/capitalprojects'} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="capitalprojects/table" component={CapitalProjectsTable} title={'Capital Projects Table'} about={'/about/capitalprojects'} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="capitalprojects/explorer" component={CapitalProjectsExplorer} title={'Capital Projects Explorer'} about={'/about/capitalprojects'} onEnter={confirmPermissions('sitewide_access')} />
    <Route path="capitalproject/:id" component={ProjectPage} title={'Capital Project Details'} about={'/about/capitalprojects'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="feedback/:type" component={FeedbackPage} title={'User Feedback'} onEnter={confirmPermissions('sitewide_access')} />

    <Route path="login" component={Login} title={'Login'} />
    <Route path="authsuccess" component={AuthSuccess} onEnter={rerouteLoggedIn} />
    <Route path="notfound" component={NotFound} />
    <Route path="*" onEnter={rerouteNotFound} />
  </Route>
);
