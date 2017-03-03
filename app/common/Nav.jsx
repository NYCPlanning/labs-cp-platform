import React from 'react';
import { Link } from 'react-router';

import AuthService from '../helpers/AuthService';

import './Nav.scss';

const Nav = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.array,
  },

  getDefaultProps() {
    return {
      title: '',
      children: null,
    };
  },

  handleLogout() {
    AuthService.logout();
  },

  handleLogin() {
    AuthService.login();
  },

  render() {
    const profile = AuthService.getProfile();

    const userMenu = AuthService.loggedIn() ? (
      <li className="dropdown">
        <a
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa fa-user" aria-hidden="true" /> {profile.username || profile.email}
          <span className="caret" />
        </a>

        <ul className="dropdown-menu">
          <li><a onClick={this.handleLogout}> Log Out</a></li>
        </ul>
      </li>

    ) :
    (
      <li><a onClick={this.handleLogin}><i className="fa fa-user" aria-hidden="true" /> Log In</a></li>
    );


    return (
      <nav className={'navbar navbar-default navbar-fixed-top'}>
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/">&#8291;</Link>
          <div className="navbar-title">
            Capital Planning Platform
            {(
              this.props.title &&
                <span className={'title'}> | {this.props.title}</span>
            )}
          </div>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right ">
            <li><Link to="/"> Home</Link></li>
            {this.props.children}
            <li><Link to="/about">About</Link></li>
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLScP9JxDvfCmMUxzT9l0_MRYBtTgeAep7pHYO5QUtrRCXGxVTw/viewform" target="_blank" rel="noopener noreferrer"> Send Feedback</a></li>
            {userMenu}
          </ul>
        </div>
      </nav>
    );
  },
});

module.exports = Nav;
