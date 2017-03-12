// Auth.js - Auth0 helper, can trigger login and logout, get/set profile, etc
import { browserHistory } from 'react-router';
import Auth0Lock from 'auth0-lock';
import _ from 'underscore';

import { isTokenExpired } from './jwtHelper';
import appConfig from './appConfig';

const clientId = appConfig.auth0_client_id;
const domain = appConfig.auth0_domain;

const lockOptions = {
  allowSignUp: true,
  allowLogin: true,
  autoclose: true,
  loginAfterSignUp: true,
  auth: {
    redirect: false,
  },
  theme: {
    logo: '/img/logo_80.png',
    primaryColor: '#EA6200',
  },
  languageDictionary: {
    title: 'Please log in',
  },
  additionalSignUpFields: [
    {
      name: 'name',
      placeholder: 'Your Name',
    },
    {
      name: 'organization',
      placeholder: 'Your Organization',
    },
    {
      type: 'select',
      name: 'industry',
      placeholder: 'Your Industry',
      options: [
        { value: 'government', label: 'Government' },
        { value: 'planning', label: 'Planning' },
        { value: 'nonprofit', label: 'Non-Profit/Civic Group' },
        { value: 'realestate', label: 'Real Estate' },
        { value: 'technology', label: 'Technology' },
        { value: 'student', label: 'Student' },
        { value: 'independent', label: 'Independent' },
        { value: 'other', label: 'Other' },
      ],
      prefill: 'us',
    },
  ],
};

const AuthService = {
  doAuthentication(authResult) {
    const lock = new Auth0Lock(clientId, domain);
    lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
      // Handle error
        return;
      }

      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(profile));

      // redirect to the path the user was trying to get to, or home
      // browserHistory.push(authResult.state || '/');
      browserHistory.push(location.pathname);
    });
  },

  login() {
    const options = {};
    _.extend(options, lockOptions, {}); // eslint-disable-line no-undef
    const lock = new Auth0Lock(clientId, domain, options);

    lock.show();
    lock.on('authenticated', this.doAuthentication);
  },

  signup() {
    const options = {};
    _.extend(options, lockOptions, { // eslint-disable-line no-undef
      initialScreen: 'signUp',
      allowLogin: false,
      languageDictionary: {
        title: 'Create your account',
      },
    });

    const lock = new Auth0Lock(clientId, domain, options);

    lock.show();
    lock.on('authenticated', this.doAuthentication);
  },

  logout() { // eslint-disable-line class-methods-use-this
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    browserHistory.push(location.pathname);
  },

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  },

  getToken() { // eslint-disable-line class-methods-use-this
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  },

  getProfile() { // eslint-disable-line class-methods-use-this
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  },
};

export default AuthService;
