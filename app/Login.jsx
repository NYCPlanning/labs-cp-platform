//Login.jsx - The Login Page, displays the Auth0 login modal
//Props:
//  auth - auth object passed down from App.jsx, triggers the Auth0 modal

import React from 'react'
import {browserHistory} from 'react-router'

var Login = React.createClass({
  componentDidMount() {
    this.props.auth.login()
  },

  render() {
    return (
      <div className="row">
        <div className="col-md-12 text-center" id="lock-container"/>
      </div>
    )
  } 
})

module.exports=Login