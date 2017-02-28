// Auth.js - Auth0 helper, can trigger login and logout, get/set profile, etc
import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      initialScreen: 'login',
      allowSignUp: true,
      auth: {
        redirectUrl: `${document.location.origin}/authsuccess`,
        responseType: 'id_token',
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
          // The following properties are optional
          prefill: 'us',
        },
      ],

    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this.doAuthentication.bind(this));
  }

  doAuthentication(authResult) {
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
      // Handle error
        return;
      }

      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(profile));

      // redirect to the path the user was trying to get to, or home
      browserHistory.push(authResult.state || '/');
    });
  }

  login(previousPath, options = {}) {
    // Call the show method to display the widget.

    this.lock.show({
      closable: options.closable || true,
      auth: {
        redirect: false,
        params: {
          state: previousPath,
        },
      },
    });
  }

  logout() { // eslint-disable-line class-methods-use-this
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }
}
