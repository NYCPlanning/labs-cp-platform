import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { connect } from "react-redux";

import * as authActions from "../actions/auth";

import "./Nav.scss";

const Nav = (props) => {
  const profile = props.profile;
  return (
    <nav className={"navbar navbar-default navbar-fixed-top"}>
      <div className="info-banner">
        <p>
          In an effort to better serve the needs of users like you, we'd like to
          hear from you about how we can improve services like this site.&nbsp;
          <a
            href="https://cdn.forms-content.sg-form.com/28f9b3d0-9909-11ee-8461-5ad38fb68638"
            target="_blank"
          >
            Click here to sign up.
          </a>
        </p>
      </div>
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
        <Link className="navbar-brand" to="/">
          &#8291;
        </Link>
        <div className="navbar-title">Capital Planning Explorer</div>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right ">
          <li>
            <Link to="/map"> Map</Link>
          </li>
          <li>
            <Link to="/table"> Table</Link>
          </li>
          <li style={{ padding: "13px 0", fontSize: "17px" }}> | </li>
          <li>
            <Link to={props.about}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Nav.defaultProps = {
  title: "",
  about: "/about",
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
