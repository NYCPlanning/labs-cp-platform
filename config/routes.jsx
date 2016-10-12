import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'

import App from '../components/App.jsx'
import Login from '../components/Login.jsx'
import Auth from '../helpers/Auth.js'

import HomePage from '../components/HomePage.jsx'
import CapitalProjectsExplorer from '../components/CapitalProjectsExplorer.jsx'
import FacilitiesExplorer from '../components/FacilitiesExplorer.jsx'
import PipelineExplorer from '../components/PipelineExplorer.jsx'
import Sample from '../components/Sample.jsx'

 var auth0_client_id = '3bulG9YPLTsoujIHvFg91w04HNIODCu1',
  auth0_domain = 'cpmanage.auth0.com'

const auth = new Auth(auth0_client_id, auth0_domain);

const requireAuth = (nextState, replace) => {
  // console.log('requireAuth')
  // if (!Auth.loggedIn()) {
  //   replace({ nextPathname: nextState.location.pathname }, '/login')
  //   //auth.requestedURL = nextState.location.pathname
  // }
}




module.exports = (
  <Route path="/" component={App} auth={auth} >
    <IndexRoute component={HomePage}/>
    <Route path="login" component={Login} />
    <Route path="facilities" component={FacilitiesExplorer} />
    <Route path="pipeline" component={PipelineExplorer} />
    <Route path="capitalprojects" component={CapitalProjectsExplorer} />
  </Route>
)

