// AuthHelper - Methods for determining if the user is logged in and getting auth details
import { isTokenExpired } from './jwtHelper';

const AuthHelper = {
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

export default AuthHelper;
