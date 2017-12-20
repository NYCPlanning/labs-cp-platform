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
import FacilitiesExplorer from '../app/facilities/Explorer';
import CapitalProjectsExplorer from '../app/capitalprojects/Explorer';
import CapitalProjectsTable from '../app/tables/capital-projects/CapitalProjectsTable';

// Detail Pages
import CapitalProjectDetailPage from '../app/detail-pages/CapitalProjectDetailPage';
import HousingDetailPage from '../app/detail-pages/HousingDetailPage';
import FacilityDetailPage from '../app/detail-pages/FacilityDetailPage';
import BudgetRequestDetailPage from '../app/detail-pages/BudgetRequestDetailPage';

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

    { /* Facilities */ }
    <Route path="facilities" component={FacilitiesLanding} title={'Facilities Explorer'} about={'/about/facilities'} />
    <Route path="facilities/explorer" component={FacilitiesExplorer} title={'Facilities Explorer'} about={'/about/facilities'} />

    <Redirect
      from="pops"
      to="/facilities/explorer"
      state={{
        filterDimensions: getDefaultFilterDimensions({ selected: {
          'Parks, Gardens, and Historical Sites': {
            'Parks and Plazas': {
              'Privately Owned Public Space': null },
          },
        } }),
      }}
    />

    { /* Pipeline */ }
    <Redirect from="pipeline" to="map/housing" />
    <Redirect from="pipeline/explorer" to="map/housing" />

    { /* Capital Projects */ }
    <Route path="capitalprojects" component={ensureSitewideAccess(CapitalProjectsLanding)} title={'Capital Projects Explorer'} about={'/about/capitalprojects'} />
    <Route path="capitalprojects/table" component={ensureSitewideAccess(CapitalProjectsTable)} title={'Capital Projects Explorer'} about={'/about/capitalprojects'} />
    <Route path="capitalprojects/explorer" component={ensureSitewideAccess(CapitalProjectsExplorer)} title={'Capital Projects Explorer'} about={'/about/capitalprojects'} />


    { /* Consolidated Map */ }
    <Route path="/map" component={ensureSitewideAccess(CapitalProjectsExplorer)} about={'/about/capitalprojects'} />
    <Route path="/map/:layer" component={ensureSitewideAccess(CapitalProjectsExplorer)} about={'/about/capitalprojects'} />
    <Route path="/table" component={ensureSitewideAccess(CapitalProjectsTable)} about={'/about/capitalprojects'} />

    { /* Detail Pages */ }
    <Route path="capitalproject/:id" component={ensureSitewideAccess(CapitalProjectDetailPage)} title={'Capital Project Details'} about={'/about/capitalprojects'} />
    <Route path="budgetrequest/:id" component={ensureSitewideAccess(BudgetRequestDetailPage)} title={'Budget Request Detail'} about={'/about/capitalprojects'} />
    <Route path="development/:id" component={ensureSitewideAccess(HousingDetailPage)} title={'Development Details'} about={'/about/pipeline'} />
    <Route path="pops/:id" component={FacilityDetailPage} title={'Facility Details'} about={'/about/facilities'} facilityRoute="pops" />
    <Route path="facility/:id" component={FacilityDetailPage} title={'Facility Details'} about={'/about/facilities'} facilityRoute="facility" />

    { /* Auth and Sitewide */ }
    <Route path="login" component={Login} title={'Login'} />
    <Route path="authsuccess" component={AuthSuccess} onEnter={rerouteLoggedIn} />
    <Route path="email_verification" component={EmailVerification} title={'Email Verification'} />
    <Route path="notfound" component={NotFound} />

    <Redirect from="*" to="notfound" />
  </Route>
);
