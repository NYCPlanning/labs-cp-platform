import auth0 from 'auth0-js';
import { browserHistory } from 'react-router';

import appConfig from '../config/appConfig';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: appConfig.auth0_domain,
    clientID: appConfig.auth0_client_id,
    redirectUri: 'http://localhost:8080/authsuccess',
    audience: 'https://cpmanage.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid email',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult);
        
        this.setProfile(authResult);
        this.setSession(authResult);

        // history.replace('/home');
      } else if (err) {
        // history.replace('/home');
        console.log(err);
      }
    });
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  setProfile(authResult) {
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      localStorage.setItem('profile', JSON.stringify(user));
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    // navigate to the home route
    // history.replace('/home');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
