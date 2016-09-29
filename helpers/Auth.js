import { isTokenExpired } from './jwtHelper'

module.exports = {
  setProfile: function(profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
  },

  getProfile: function() {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  },

  setToken: function(idToken) {
    localStorage.setItem('id_token', idToken)
  },

  getToken: function() {
    return localStorage.getItem('id_token')
  },

  loggedIn: function() {
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  },

  logout: function() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}