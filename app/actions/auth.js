import * as AT from '../constants/actionTypes';

export const login = ({ params }) => ({
  type: AT.AUTH0_LOGIN,
  payload: { params },
});

export const logout = () => ({
  type: AT.AUTH0_LOGOUT,
});

export const signUp = () => ({
  type: AT.AUTH0_SIGNUP,
});

export const loadCredentials = ({ targetPath }) => ({
  type: AT.LOAD_CREDENTIALS,
  payload: { targetPath },
});

export const authorizeUser = (profile, token) => ({
  type: AT.AUTHORIZE_USER,
  payload: { profile, token },
});

export const deauthorizeUser = () => ({
  type: AT.DEAUTHORIZE_USER,
});

export const ensureAccess = (permission) => ({
  type: AT.ENSURE_ACCESS,
});
