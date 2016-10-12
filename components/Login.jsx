import React from 'react'
import {browserHistory} from 'react-router'




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

  componentDidMount() {
    this.props.auth.login()
  },

  render() {
    return (
      <div className="row">

        <div className="col-md-12 text-center" id="lock-container">
        </div>
      </div>
    )
  } 
})

module.exports=Login