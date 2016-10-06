import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'
import App from '../components/App.jsx'
import AgencyDashboardContainer from '../components/AgencyDashboardContainer.jsx'
import AdminDashboard from '../components/AdminDashboard.jsx'
import Login from '../components/Login.jsx'
import Auth from '../helpers/Auth.js'

import HomePage from '../components/HomePage.jsx'
import FacilitiesExplorer from '../components/FacilitiesExplorer.jsx'
import PipelineExplorer from '../components/PipelineExplorer.jsx'

const requireAuth = (nextState, replace) => {
  // console.log('requireAuth')
  // if (!Auth.loggedIn()) {
  //   replace({ nextPathname: nextState.location.pathname }, '/login')
  //   //auth.requestedURL = nextState.location.pathname
  // }
}

module.exports = (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage}/>
    <Route path="agency/:agency" component={AgencyDashboardContainer} onEnter={requireAuth}/>
    <Route path="login" component={Login} />
    <Route path="facilities" component={FacilitiesExplorer} />
    <Route path="pipeline" component={PipelineExplorer} />
  </Route>
)

