//routes.jsx - Includes top-level components and defines routes
//Props: none

import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'

import App from '../app/App.jsx'
import Login from '../app/Login.jsx'
import Auth from './helpers/Auth.js'

import HomePage from '../app/HomePage.jsx'

import CapitalProjects from '../app/capitalprojects/Explorer.jsx'
import ProjectPage from '../app/capitalprojects/ProjectPage.jsx'

import PipelineExplorer from '../app/pipeline/PipelineExplorer.jsx'
import DevelopmentPage from '../app/pipeline/DevelopmentPage.jsx'

import FacilitiesExplorer from '../app/facilities/FacilitiesExplorer.jsx'
import FacilityPage from '../app/facilities/FacilityPage.jsx'
import FacilitiesLanding from '../app/facilities/FacLanding.jsx'

import NotFound from '../app/NotFound.jsx'

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
    <IndexRoute component={HomePage} onEnter={requireAuth}/>


    <Route path="facilities" component={FacilitiesLanding} onEnter={requireAuth}/>
    <Route path="facilities/all" component={FacilitiesExplorer} title={'Facilities Explorer'} miniNav={true} onEnter={requireAuth} />
    <Route path="facilities/:id" component={FacilityPage} title={'Facility Details'} miniNav={true}/>
    <Route path="facilities/domain/:domain" component={FacilitiesExplorer} onEnter={requireAuth}/>

    <Route path="pipeline" component={PipelineExplorer} title={'Housing Development Pipeline'} miniNav={true} onEnter={requireAuth}/>
    <Route path="pipeline/:id" component={DevelopmentPage} title={'Development Details'} miniNav={true} onEnter={requireAuth}/>

    <Route path="capitalprojects" component={CapitalProjects} title={'Capital Projects Explorer'} miniNav={true} onEnter={requireAuth}/>
    <Route path="capitalprojects/:id" component={ProjectPage} title={'Capital Project Details'} miniNav={true} onEnter={requireAuth}/>

    <Route path="login" component={Login} onEnter={rerouteLoggedIn}/>
    <Route path="authsuccess" component={AuthSuccess} onEnter={rerouteLoggedIn}/>
    <Route path='*' component={NotFound} />
  </Route>
)

