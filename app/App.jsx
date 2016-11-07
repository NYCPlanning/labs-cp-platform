import React from 'react'
import Auth from './helpers/Auth.js'
import {browserHistory} from 'react-router'

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
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
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