import React from 'react'
import ReactDOM from 'react-dom'
import {Router,browserHistory, IndexRedirect} from 'react-router'
import routes from './config/routes.jsx'
import { createHistory, useBasename } from 'history'


const history = useBasename(createHistory)({
  basename: null
})

ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root')
)