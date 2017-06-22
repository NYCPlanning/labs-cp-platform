import React from 'react';
import { browserHistory, Route, IndexRoute, Redirect } from 'react-router';

import App from '../app/App';
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

const rerouteLoggedIn = (nextState, replace) => {
  if (store.getState().currentUser.isLoggedIn) {
    replace({ pathname: '/' });
  }
};

// dummy component for the authsuccess route
const AuthSuccess = () => (
  <div />
);

const ensureAccess = (permission) => (WrappedComponent) => {
  return class EnsureAccess extends React.Component {
    static displayName = `ensureAccess${WrappedComponent.name}`;

    componentWillMount() {
      const { profile, isLoggedIn } = store.getState().currentUser;

      const permissions = profile && profile.permissions;

      if ((permissions && permissions.indexOf(permission) === -1) || !isLoggedIn) {
        // if trying to load homepage, reroute to facilities, else reroute to not found
        if (this.props.location.pathname === '/') {
          browserHistory.replace({ pathname: '/facilities' });
        } else {
          browserHistory.replace({
            pathname: '/login',
            state: {
              targetPath: this.props.location.pathname,
            },
          });
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }
};

const ensureSitewideAccess = ensureAccess('sitewide_access');

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ensureSitewideAccess(HomePage)} />
    <Route path="about" component={About} title={'About'} />
    <Route path="about/facilities" component={AboutFacilities} title={'About'} about={'/about/facilities'} />
    <Route path="about/pipeline" component={AboutPipeline} title={'About'} about={'/about/pipeline'} />
    <Route path="about/capitalprojects" component={AboutCapitalProjects} title={'About'} about={'/about/capitalprojects'} />

    <Route path="facilities" component={FacilitiesLanding} title={'Facilities Explorer'} about={'/about/facilities'} />
    <Route path="facilities/explorer" component={FacilitiesExplorer} title={'Facilities Explorer'} about={'/about/facilities'} />
    <Route path="facility/:id" component={FacilityPage} title={'Facility Details'} about={'/about/facilities'} />

    <Redirect from="pipeline" to="pipeline/explorer" />
    <Route path="pipeline/explorer" component={ensureSitewideAccess(PipelineExplorer)} title={'Housing Development Pipeline'} about={'/about/pipeline'} />
    <Route path="development/:id" component={ensureSitewideAccess(DevelopmentPage)} title={'Development Details'} about={'/about/pipeline'} />

    <Route path="capitalprojects" component={ensureSitewideAccess(CapitalProjectsLanding)} title={'NYC Capital Projects Explorer'} about={'/about/capitalprojects'} />
    <Route path="capitalprojects/table" component={ensureSitewideAccess(CapitalProjectsTable)} title={'Capital Projects Table'} about={'/about/capitalprojects'} />
    <Route path="capitalprojects/explorer" component={ensureSitewideAccess(CapitalProjectsExplorer)} title={'Capital Projects Explorer'} about={'/about/capitalprojects'} />
    <Route path="capitalproject/:id" component={ensureSitewideAccess(ProjectPage)} title={'Capital Project Details'} about={'/about/capitalprojects'} />

    <Route path="feedback/:type" component={ensureSitewideAccess(FeedbackPage)} title={'User Feedback'} />

    <Route path="login" component={Login} title={'Login'} />
    <Route path="authsuccess" component={AuthSuccess} onEnter={rerouteLoggedIn} />
    <Route path="notfound" component={NotFound} />

    <Redirect from="*" to="notfound" />
  </Route>
);
