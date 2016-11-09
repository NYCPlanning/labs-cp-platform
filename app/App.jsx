//App.jsx - Top-level container for the react SPA, it passes the auth property to 
//its children, which are the app's top-level routes
//Props:
//  route - object passed in from react-router, which includes auth
//  children - the top-level route(s) from react router

import React from 'react'
import Auth from './helpers/Auth.js'

import {browserHistory} from 'react-router'

import '../stylesheets/App.scss'

var App = React.createClass({
  getInitialState() {
    return({
      loggedIn: true
    })
  },

  logout() {
    Auth.logout()
    browserHistory.push('/login');
  },

  render() {
    let children = null;

    //pass the auth object to the child components so they know who is logged in, etc
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth 
      })
    }

    return(
      <div className="full-height">
       {children}
      </div>
    )
  }
})

module.exports=App