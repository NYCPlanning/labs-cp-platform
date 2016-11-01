import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Router, browserHistory} from 'react-router'
import { createHistory, useBasename } from 'history'
import ReactGA from 'react-ga'

import routes from './config/routes.jsx'

//initialize google analytics
ReactGA.initialize('UA-84250233-2')

function fireTracking() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview( window.location.pathname );
}


const history = useBasename(createHistory)({
  basename: null
})


ReactDOM.render(
  <Router onUpdate={fireTracking} history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root')
)