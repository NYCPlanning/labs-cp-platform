import React from 'react';
import { browserHistory, Route, IndexRoute, Redirect } from 'react-router';

// Pages
import App from '../app/App';
import Login from '../app/pages/Login';
import HomePage from '../app/pages/HomePage';
import NotFound from '../app/pages/NotFound';
import EmailVerification from '../app/pages/EmailVerification';
import { About, AboutFacilities, AboutPipeline, AboutCapitalProjects } from '../app/pages/About';

// Landing Pages
import FacilitiesLanding from '../app/facilities/LandingPage';
import CapitalProjectsLanding from '../app/capitalprojects/LandingPage';

// Explorers
import CapitalProjectsTable from '../app/tables/capital-projects/CapitalProjectsTable';
import TableDetailPage from '../app/tables/detail-pages/DetailPage';

import Explorer from '../app/explorer/Explorer';

import DetailPage from '../app/detail-pages/DetailPage';

import getDefaultFilterDimensions from '../app/facilities/config';

const rerouteLoggedIn = (nextState, replace) => {
  if (store.getState().currentUser.isLoggedIn) {
    replace({ pathname: '/' });
  }
};

// dummy component for the authsuccess route
const AuthSuccess = () => (
  <div />
);

const ensureAccess = permission => WrappedComponent => class EnsureAccess extends React.Component {
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
    return <WrappedComponent {...this.props} />;
  }
};

const ensureSitewideAccess = ensureAccess('sitewide_access');

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ensureSitewideAccess(HomePage)} />

    { /* About Pages */ }
    <Route path="about" component={About} title={'About'} />
    <Route path="about/facilities" component={AboutFacilities} title={'About'} about={'/about/facilities'} />
    <Route path="about/pipeline" component={AboutPipeline} title={'About'} about={'/about/pipeline'} />
    <Route path="about/capitalprojects" component={AboutCapitalProjects} title={'About'} about={'/about/capitalprojects'} />

    { /* POPs Redirect */ }
    <Redirect
      from="pops"
      to="/map/facilities"
      state={{
        filterDimensions: getDefaultFilterDimensions({ selected: {
          'Parks, Gardens, and Historical Sites': {
            'Parks and Plazas': {
              'Privately Owned Public Space': null },
          },
        } }),
      }}
    />

    { /* Redirects from deprecated explorers */ }
    <Redirect from="pipeline" to="map/housing" />
    <Redirect from="pipeline/explorer" to="map/housing" />
    <Redirect from="facilities/explorer" to="map/facilities" />
    <Redirect from="capitalprojects/explorer" to="map/capitalprojects" />

    { /* Landing Pages */ }
    <Route path="capitalprojects" component={ensureSitewideAccess(CapitalProjectsLanding)} title={'Capital Projects Explorer'} about={'/about/capitalprojects'} />
    <Route path="facilities" component={FacilitiesLanding} title={'Facilities Explorer'} about={'/about/facilities'} />

    { /* Table */ }
    <Route path="/table" component={ensureSitewideAccess(CapitalProjectsTable)} title={'Capital Projects Table'} about={'/about/capitalprojects'} />
    <Route path="capitalprojects/table" component={ensureSitewideAccess(CapitalProjectsTable)} title={'Capital Projects Table'} about={'/about/capitalprojects'} />
    <Route path="/table/capitalproject/:id" component={ensureSitewideAccess(TableDetailPage)} title={'Capital Project'} about={'/about/capitalprojects'} />

    { /* Map */ }
    <Route path="/map" component={Explorer} about={'/about/capitalprojects'} />
    <Route path="/map/:layer" component={Explorer} about={'/about/capitalprojects'} />

    { /* Detail Pages */ }
    <Route component={Explorer}>
      <Route
        path="capitalproject/:id"
        component={ensureSitewideAccess(DetailPage)}
        about={'/about/capitalprojects'}
        type="capitalproject"
      />
      <Route
        path="budgetrequest/:id"
        component={ensureSitewideAccess(DetailPage)}
        about={'/about/capitalprojects'}
        type="budgetrequest"
      />
      <Route
        path="development/:id"
        component={ensureSitewideAccess(DetailPage)}
        about={'/about/pipeline'}
        type="development"
      />
      <Route
        path="pops/:id"
        component={DetailPage}
        about={'/about/facilities'}
        type="pops"
      />
      <Route
        path="facility/:id"
        component={DetailPage}
        about={'/about/facilities'}
        type="facility"
      />
      <Route
        path="sca/:id"
        component={DetailPage}
        about={'/about/capitalprojects'}
        type="sca"
      />
    </Route>

    { /* Auth and Sitewide */ }
    <Route path="login" component={Login} title={'Login'} />
    <Route path="authsuccess" component={AuthSuccess} onEnter={rerouteLoggedIn} />
    <Route path="email_verification" component={EmailVerification} title={'Email Verification'} />
    <Route path="notfound" component={NotFound} />

    <Redirect from="*" to="notfound" />
  </Route>
);
