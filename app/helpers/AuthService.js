// Auth.js - Auth0 helper, can trigger login and logout, get/set profile, etc


import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      initialScreen: 'login',
      closable: false,
      allowSignUp: false,
      auth: {
        redirectUrl: `${document.location.origin}/authsuccess`,
        responseType: 'id_token',
      },
      theme: {
        logo: '/img/logo_80.png',
      },
      languageDictionary: {
        title: 'Please log in with your NYC email address',
      },

    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this.doAuthentication.bind(this));


    // binds login functions to keep this context
    // this.login = this.login.bind(this);

    // this.getProfile = this.getProfile.bind(this);

    this.requestedURL = null;
  }


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
  }

  login() {
    // Call the show method to display the widget.

    this.lock.show({
      auth: {
        params: {
          state: this.requestedURL,
        },
      },
    });
  }

  logout() { // eslint-disable-line class-methods-use-this
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    browserHistory.push('/');
  }
}