import React from 'react'

var App = React.createClass({
  getInitialState() {
    return({
      loggedIn: true
    })
  },

  handleGoogleSuccess(response) {
    console.log(response)
    this.setState({
      loggedIn: true
    })
  },

  handleGoogleFailure(response) {
    console.log(response)
  },

  render() {
    return(
      <div className='full-height'>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
          </div>
        </nav>
        <div id="main-container" className="container full-height">
          {this.props.children}
        </div>
      </div>
    )
  }
})

module.exports=App