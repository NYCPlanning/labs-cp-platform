import React from 'react';
import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';


import appConfig from '../helpers/appConfig';

import './Login.scss';

const Login = React.createClass({
  propTypes: {
    auth: React.PropTypes.shape({
      login: React.PropTypes.func,
    }),
  },

  getDefaultProps() {
    return {
      auth: null,
    };
  },

  componentDidMount() {
    // trigger Auth0-lock Login Modal
    this.lock = new Auth0Lock(appConfig.auth0_client_id, appConfig.auth0_domain, {
      initialScreen: 'signUp',
      closable: false,
      allowSignUp: true,
      allowLogin: false,
      auth: {
        redirectUrl: `${document.location.origin}/authsuccess`,
        responseType: 'id_token',
      },
      theme: {
        logo: '/img/logo_80.png',
      },
      languageDictionary: {
        title: 'Please sign up with your NYC email address',
      },

    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this.doAuthentication);

    this.lock.show();
  },

  doAuthentication(authResult) {
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
      // Handle error
        return;
      }

      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(profile));

      browserHistory.push(authResult.state || '/');
    });
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
