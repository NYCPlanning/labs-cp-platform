import React from 'react';
import PropTypes from 'prop-types';
import AuthService from '../helpers/AuthService';


class Login extends React.Component {
  componentDidMount() {
    const targetPath = (this.props.location && this.props.location.state) ? this.props.location.state.targetPath : '/';
    AuthService.login({ targetPath });
  }

  render() {
    return (
      <div className="full-screen" />
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Login;
