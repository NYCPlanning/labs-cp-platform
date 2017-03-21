import React, { PropTypes } from 'react';
import AuthService from '../helpers/AuthService';


const Login = React.createClass({

  componentDidMount() {
    const lock = AuthService.login();
    lock.on('authenticated', () => {
      console.log('authenticated!')
    });
  },

  render() {
    return (
      <div className="full-screen" />
    );
  },
});

module.exports = Login;
