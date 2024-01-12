import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth';

import './Nav.scss';

const Nav = (props) => {
  const profile = props.profile;

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
          Capital Planning Explorer
        </div>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right ">
          <li><Link to="/map"> Map</Link></li>
          <li><Link to="/table"> Table</Link></li>
          <li style={{ padding: '13px 0', fontSize: '17px' }}> | </li>
          <li><Link to={props.about}>About</Link></li>
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
