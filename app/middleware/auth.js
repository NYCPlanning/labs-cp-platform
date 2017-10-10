import Auth0Lock from 'auth0-lock';
import _ from 'lodash';

import { browserHistory } from 'react-router';
import * as AT from '../constants/actionTypes';
import * as authActions from '../actions/auth';
import { isTokenExpired } from '../helpers/jwtHelper';
import appConfig from '../helpers/appConfig';


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

const authMiddleware = ({ getState, dispatch }) => next => (action) => {
  if (getState().currentUser.token && isTokenExpired(getState().currentUser.token)) {
    localStorage.removeItem('NYCPlanning_profile');
    localStorage.removeItem('NYCPlanning_idToken');
    // console.log('deauth Middleware token expired');
    dispatch(authActions.logout());

    browserHistory.replace({
      pathname: '/login',
      state: {
        targetPath: window.location.pathname,
      },
    });
  }

  if (action.type === AT.LOAD_CREDENTIALS) {
    const token = localStorage.getItem('NYCPlanning_idToken');
    const profile = localStorage.getItem('NYCPlanning_profile');

    if (token) {
      dispatch(authActions.authorizeUser(JSON.parse(profile), token));
      browserHistory.push(action.payload.targetPath);
    }
  }

  if (action.type === AT.AUTH0_LOGIN) {
    const options = _.extend({}, lockOptions);
    const lock = new Auth0Lock(clientId, domain, options);

    lock.show();

    lock.on('authenticated', ({ idToken }) => {
      lock.getProfile(idToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem('NYCPlanning_profile', JSON.stringify(profile));
        localStorage.setItem('NYCPlanning_idToken', idToken);
        dispatch(authActions.authorizeUser(profile, idToken));

        // redirect to the path the user was trying to get to, or the same page
        if (action.payload && action.payload.targetPath) {
          browserHistory.push(action.payload.targetPath);
        } else {
          browserHistory.push(location.pathname);
        }
      });
    });
  }

  if (action.type === AT.AUTH0_LOGOUT) {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('NYCPlanning_profile');
    localStorage.removeItem('NYCPlanning_idToken');
    dispatch(authActions.deauthorizeUser());
    browserHistory.push('/');
  }

  if (action.type === AT.AUTH0_SIGNUP) {
    const options = _.extend({}, lockOptions, {
      initialScreen: 'signUp',
      allowLogin: false,
      languageDictionary: {
        title: 'Create your account',
      },
    });

    const lock = new Auth0Lock(clientId, domain, options);

    lock.show();
    lock.on('authenticated', ({ idToken }) => {
      lock.getProfile(idToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem('NYCPlanning_profile', JSON.stringify(profile));
        localStorage.setItem('NYCPlanning_idToken', idToken);
        dispatch(authActions.authorizeUser(profile, idToken));

        // redirect to the path the user was trying to get to, or the same page
        if (action.payload.params && action.payload.params.targetPath) {
          browserHistory.push(action.payload.params.targetPath);
        } else {
          browserHistory.push(location.pathname);
        }
      });
    });
  }

  return next(action);
};

export default authMiddleware;
