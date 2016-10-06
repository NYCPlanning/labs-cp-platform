import React from 'react'
import Auth from '../helpers/Auth.js'
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
    var profile = Auth.getProfile()
    console.log(profile)

    return(
      <div className="full-height">
       {this.props.children}
      </div>
    )
  }
})

module.exports=App