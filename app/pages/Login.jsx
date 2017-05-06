import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import AuthService from '../helpers/AuthService';


const Login = createReactClass({
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
