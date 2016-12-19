//Login.jsx - The Login Page, displays the Auth0 login modal
//Props:
//  auth - auth object passed down from App.jsx

import React from 'react'
import {browserHistory} from 'react-router'

import '../stylesheets/Login.scss'

var Login = React.createClass({
  componentDidMount() {
    //trigger Auth0-lock Login Modal
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