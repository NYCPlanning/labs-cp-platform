import React from 'react'
import {browserHistory} from 'react-router'




var Login = React.createClass({

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