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
      <div className='full-height'>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{profile.name} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a onClick={this.logout}>Sign Out</a></li>
                  </ul>
                </li>
              </ul>
            </div> 
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