import React, { PropTypes } from 'react';

import './Login.scss';

const Login = React.createClass({
  propTypes: {
    auth: PropTypes.shape({
      login: React.PropTypes.func,
    }),
    location: PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      auth: null,
    };
  },

  componentDidMount() {
    // trigger Auth0-lock Login Modal, pass in previousPath so it can redirect after login.
    this.props.auth.login(this.props.location.state.previousPath);
  },

  render() {
    return (
      <div className="row">
        <div className="col-md-12 text-center" id="lock-container" />
      </div>
    );
  },
});

module.exports = Login;
