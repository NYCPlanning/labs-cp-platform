// import Auth0 from 'auth0-js';
import _ from 'lodash';

import { browserHistory } from 'react-router';
import * as AT from '../constants/actionTypes';
import * as authActions from '../actions/auth';
// import { isTokenExpired } from '../helpers/jwtHelper';
import Auth from '../helpers/Auth';

// import appConfig from '../config/appConfig';


// const clientId = appConfig.auth0_client_id;
// const domain = appConfig.auth0_domain;

// const lockOptions = {
//   allowSignUp: true,
//   loginAfterSignUp: true,
//   allowLogin: true,
//   autoclose: true,
//   auth: {
//     redirect: false,
//   },
//   theme: {
//     logo: '/img/logo_80.png',
//     primaryColor: '#EA6200',
//   },
//   languageDictionary: {
//     title: 'Please log in',
//   },
// };

const authMiddleware = ({ getState, dispatch }) => next => (action) => {
  const auth = new Auth();

  // if (!auth.isAuthenticated()) {
  //   auth.logout();
  //   browserHistory.replace({
  //     pathname: '/login',
  //     state: {
  //       targetPath: window.location.pathname,
  //     },
  //   });
  // }

  if (action.type === AT.LOAD_CREDENTIALS) {
    if (auth.isAuthenticated()) {
      console.log(auth.getProfile());
      dispatch(authActions.authorizeUser(auth.getProfile(), auth.getToken()));
      browserHistory.push(action.payload.targetPath);
    }
  }

  if (action.type === AT.AUTH0_LOGIN) {
    auth.login();
    // const options = _.extend({}, lockOptions);
    // const lock = new Auth0.WebAuth({
    //   domain: appConfig.auth0_domain,
    //   clientID: appConfig.auth0_client_id,
    //   responseType: 'token id_token',
    //   audience: 'https://' + cpmanage.auth0.com + '/userinfo',
    //   scope: 'openid',
    //   redirectUri: 'http://localhost:8080/authsuccess'
    // });

    // lock.show();

    // lock.on('authenticated', (authResult) => {
    //   lock.getProfile(authResult.accessToken, (error, profile) => {
    //     if (error) {
    //       // Handle error
    //       return;
    //     }

    //     localStorage.setItem('NYCPlanning_profile', JSON.stringify(profile));
    //     localStorage.setItem('NYCPlanning_accessToken', authResult.accessToken);
    //     dispatch(authActions.authorizeUser(profile, authResult.accessToken));

    //     if (!profile.email_verified) {
    //       browserHistory.push('/email_verification');
    //     }

    //     // redirect to the path the user was trying to get to, or the same page
    //     if (action.payload && action.payload.targetPath) {
    //       browserHistory.push(action.payload.targetPath);
    //     } else {
    //       browserHistory.push(location.pathname);
    //     }
    //   });
    // });
  }

  if (action.type === AT.AUTH0_LOGOUT) {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('NYCPlanning_profile');
    localStorage.removeItem('NYCPlanning_accessToken');
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
    lock.on('authenticated', (authResult) => {
      lock.getProfile(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem('NYCPlanning_profile', JSON.stringify(profile));
        localStorage.setItem('NYCPlanning_accessToken', authResult.accessToken);
        dispatch(authActions.authorizeUser(profile, authResult.accessToken));

        if (!profile.email_verified) {
          browserHistory.push('/email_verification');
        }

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
