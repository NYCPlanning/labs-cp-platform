import { isTokenExpired } from './jwtHelper'
import Auth0Lock from 'auth0-lock'
import {browserHistory} from 'react-router'



export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      closable: false,
      allowSignUp: true,
      auth: {
        redirectUrl: (process.env.NODE_ENV == 'development') ? 'http://localhost:8080/authsuccess' : 'http://cpp.reallysimpleopendata.com/authsuccess',
        responseType: 'token'
      },
      theme: {
        logo: 'img/logo_80.png'
      },
      languageDictionary: {
        title: "Log me in"
      } 
      
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)

    this.getProfile = this.getProfile.bind(this)

    this.requestedURL=null

  }


  _doAuthentication(authResult){
    console.log('DOING AUTH', authResult, this)

    this.lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    browserHistory.push(authResult.state || '/')

  });
  }

  login() {
    // Call the show method to display the widget.
    console.log('auth', this)

    this.lock.show({
      auth: {
        params: {
          state: this.requestedURL
        } 
      }
    })
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }


  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    browserHistory.push('/')
  }
}