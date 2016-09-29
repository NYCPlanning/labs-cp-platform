import React from 'react'
import {browserHistory} from 'react-router'
import GoogleLogin from 'react-google-login'
import Auth from '../helpers/Auth.js'



var Login = React.createClass({
  handleSuccess(res) {
    console.log('success', res)

    Auth.setToken(res.tokenId)
    Auth.setProfile(res.profileObj)
    browserHistory.push('/');
  },

  handleFailure(res) {
    console.log('failure', res)
  },

  render() {
    return(
      <div className="main-column">
        <GoogleLogin
          clientId="755447712627-dm9dbsoevk9f4rvcch1hr0m853ai8f18.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.handleSuccess}
          onFailure={this.handleFailure}
        />
      </div> 
    )
  } 
})

module.exports=Login