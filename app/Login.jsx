
import React from 'react';

import './login.scss';

const Login = React.createClass({
  propTypes: {
    auth: React.PropTypes.shape({
      login: React.PropTypes.func,
    }),
  },

  componentDidMount() {
    // trigger Auth0-lock Login Modal
    this.props.auth.login();
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
