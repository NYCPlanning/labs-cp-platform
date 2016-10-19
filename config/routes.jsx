import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'

import App from '../components/App.jsx'
import Login from '../components/Login.jsx'
import Auth from '../helpers/Auth.js'

import HomePage from '../components/HomePage.jsx'
import CapitalProjectsExplorerContainer from '../components/CapitalProjectsExplorerContainer.jsx'
import FacilitiesExplorer from '../components/FacilitiesExplorer.jsx'
import PipelineExplorer from '../components/PipelineExplorer.jsx'
import Sample from '../components/Sample.jsx'
import DistrictSelection from '../components/DistrictSelection.jsx'
import CDPage from '../components/CDPage.jsx'

import FacilitiesLanding from '../components/FacilitiesLanding.jsx'
import NotFound from '../components/NotFound.jsx'


 var auth0_client_id = '3bulG9YPLTsoujIHvFg91w04HNIODCu1',
  auth0_domain = 'cpmanage.auth0.com'

const auth = new Auth(auth0_client_id, auth0_domain)

const requireAuth = (nextState, replace) => {
  auth.requestedURL = nextState.location.pathname

  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const rerouteLoggedIn = (nextState, replace) => {
  if (auth.loggedIn()) {
    replace({ pathname: '/' })
  }
}

var AuthSuccess = function() {
  return (
    <div>
    </div>
  )
} 


module.exports = (
  <Route path="/" component={App} auth={auth} >
    <IndexRoute component={HomePage} />
    <Route path="login" component={Login} onEnter={rerouteLoggedIn}/>
    <Route path="facilities" component={FacilitiesLanding} />
    <Route path="facilities/all" component={FacilitiesExplorer} />
    <Route path="facilities/domain/:domain" component={FacilitiesExplorer} onEnter={requireAuth}/>
    <Route path="pipeline" component={PipelineExplorer} onEnter={requireAuth}/>
    <Route path="capitalprojects" component={CapitalProjectsExplorerContainer} onEnter={requireAuth}/>
    <Route path="authsuccess" component={AuthSuccess} onEnter={rerouteLoggedIn}/>
    <Route path="districtmap" component={DistrictSelection} onEnter={requireAuth}/>
    <Route path="cd/:borocd" component={CDPage} onEnter={requireAuth}/>

    <Route path="facilitieslanding" component={FacilitiesLanding} onEnter={requireAuth}/>

    <Route path='*' component={NotFound} />
  </Route>
)

