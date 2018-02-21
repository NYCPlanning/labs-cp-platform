import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth';

import './Nav.scss';

const Nav = (props) => {
  const profile = props.profile;

  const displayTable = () => profile && !!profile.permissions.includes('sitewide_access');

  const userMenu = props.isLoggedIn ? (
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
        <li><a onClick={props.logout}> Log Out</a></li>
      </ul>
    </li>

  ) :
  (
    <li><a onClick={props.login}><i className="fa fa-user" aria-hidden="true" /> Log In</a></li>
  );

  return (
    <nav className={'navbar navbar-default navbar-fixed-top'}>
      <a className="beta-notice" href="http://www1.nyc.gov/site/planning/index.page">A beta project of NYC Planning - Capital Planning Division</a>

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
        </div>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right ">
          <li><Link to="/map"> Map</Link></li>
          { displayTable() && <li><Link to="/table"> Table</Link></li> }
          <li style={{ padding: '13px 0', fontSize: '17px' }}> | </li>
          <li><Link to={props.about}>About</Link></li>
          <li><a href="http://docs.capitalplanning.nyc/" target="_blank" rel="noopener noreferrer">Docs <span className="fa fa-external-link" /></a></li>
          <li><a href="https://blog.capitalplanning.nyc/" target="_blank" rel="noopener noreferrer">Blog <span className="fa fa-external-link" /></a></li>
          {userMenu}
        </ul>
      </div>
    </nav>
  );
};

Nav.defaultProps = {
  title: '',
  about: '/about',
  children: null,
  profile: {},
};

Nav.propTypes = {
  profile: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,

  about: PropTypes.string,
};

const mapStateToProps = ({ currentUser }) => ({
  profile: currentUser.profile,
  isLoggedIn: currentUser.isLoggedIn,
});

export default connect(mapStateToProps, {
  login: authActions.login,
  logout: authActions.logout,
})(Nav);
