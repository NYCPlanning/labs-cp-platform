import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../app/App';
import Login from '../app/pages/Login';
import Signup from '../app/pages/Signup';
import AuthService from './helpers/AuthService';
import AuthHelper from './helpers/AuthHelper';
import appConfig from './helpers/appConfig';

import HomePage from '../app/pages/HomePage';

import FacilitiesLanding from '../app/facilities/FacLanding';
import FacilitiesExplorer from '../app/facilities/FacilitiesExplorer';
import FacilityPage from '../app/facilities/FacilityPage';

import PipelineExplorer from '../app/pipeline/PipelineExplorer';
import DevelopmentPage from '../app/pipeline/DevelopmentPage';

import CapitalProjects from '../app/capitalprojects/Explorer';
import ProjectPage from '../app/capitalprojects/ProjectPage';

import CapitalProjectsOld from '../app/capitalprojectsold/Explorer';
import ProjectPageOld from '../app/capitalprojectsold/ProjectPage';

import FeedbackPage from '../app/pages/FeedbackPage';

import NotFound from '../app/pages/NotFound';

const auth = new AuthService(appConfig.auth0_client_id, appConfig.auth0_domain);

// redirects a route to /login if the user is not logged in
const requireAuth = (nextState, replace) => {
  auth.requestedURL = nextState.location.pathname;

  if (!AuthHelper.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

const rerouteLoggedIn = (nextState, replace) => {
  if (AuthHelper.loggedIn()) {
    replace({ pathname: '/' });
  }
};

// dummy component for the authsuccess route
const AuthSuccess = () => (
  <div />
);


module.exports = (
  <Route path="/" component={App} auth={auth} >
    <IndexRoute component={HomePage} onEnter={requireAuth} />


    <Route path="facilities" component={FacilitiesLanding} onEnter={requireAuth} />
    <Route path="facilities/all" component={FacilitiesExplorer} title={'Facilities Explorer'} miniNav onEnter={requireAuth} />
    <Route path="facilities/domain/:domain" component={FacilitiesExplorer} miniNav onEnter={requireAuth} />
    <Route path="facility/:id" component={FacilityPage} title={'Facility Details'} miniNav onEnter={requireAuth} />

    <Route path="pipeline" component={PipelineExplorer} title={'Housing Development Pipeline'} miniNav onEnter={requireAuth} />
    <Route path="development/:id" component={DevelopmentPage} title={'Development Details'} miniNav onEnter={requireAuth} />

    <Route path="capitalprojects" component={CapitalProjects} title={'Capital Projects Explorer'} miniNav onEnter={requireAuth} />
    <Route path="capitalproject/:id" component={ProjectPage} title={'Capital Project Details'} miniNav onEnter={requireAuth} />

    <Route path="capitalprojectsold" component={CapitalProjectsOld} title={'Capital Projects Explorer'} miniNav onEnter={requireAuth} />
    <Route path="capitalprojectsold/:id" component={ProjectPageOld} title={'Capital Project Details'} miniNav onEnter={requireAuth} />

    <Route path="feedback/:type" component={FeedbackPage} title={'User Feedback'} miniNav onEnter={requireAuth} />

    <Route path="login" component={Login} onEnter={rerouteLoggedIn} />
    <Route path="93f8c022f7434327b0ae4d9361cbfcb9" component={Signup} />
    <Route path="authsuccess" component={AuthSuccess} onEnter={rerouteLoggedIn} />
    <Route path="*" component={NotFound} />
  </Route>
);
