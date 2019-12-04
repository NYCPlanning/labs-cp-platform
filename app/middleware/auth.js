import { browserHistory } from 'react-router';
import * as AT from '../constants/actionTypes';
import * as authActions from '../actions/auth';
import Auth from '../helpers/Auth';

const authMiddleware = ({ dispatch }) => next => (action) => {
  const auth = new Auth();

  if (action.type === AT.LOAD_CREDENTIALS) {
    if (auth.isAuthenticated()) {
      dispatch(authActions.authorizeUser(auth.getProfile(), auth.getToken()));
      browserHistory.push(action.payload.targetPath);
    }
  }

  if (action.type === AT.AUTH0_LOGIN) {  
    auth.login({
      redirectUri: action.payload.targetPath ? action.payload.targetPath : '/', // previously pointed to location.pathname
    });
  }

  if (action.type === AT.AUTH0_LOGOUT) {
    auth.logout();
    dispatch(authActions.deauthorizeUser());
    browserHistory.push('/facilities');
  }

  return next(action);
};

export default authMiddleware;
