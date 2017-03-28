import React, { PropTypes } from 'react';
import AuthService from '../helpers/AuthService';


const Login = React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
  },

  componentDidMount() {
    const targetPath = (this.props.location && this.props.location.state) ? this.props.location.state.targetPath : '/';
    AuthService.login({ targetPath });
  },

  render() {
    return (
      <div className="full-screen" />
    );
  },
});

module.exports = Login;
