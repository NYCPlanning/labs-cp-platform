import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'
import App from '../components/App.jsx'
import AgencyDashboardContainer from '../components/AgencyDashboardContainer.jsx'
import HomePage from '../components/HomePage.jsx'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="agency/:agency" component={AgencyDashboardContainer} />
  </Route>
)

