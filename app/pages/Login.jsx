import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth';

class Login extends React.Component {
  componentDidMount() {
    const targetPath = (this.props.location && this.props.location.state) ? this.props.location.state.targetPath : '/';
    this.props.login({ targetPath });
  }

  render() {
    return (
      <div className="full-screen" />
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, {
  login: authActions.login,
})(Login);
