import * as AT from '../constants/actionTypes';
import Auth from '../helpers/Auth';

const initialState = {
  profile: null,
  token: null,
  isLoggedIn: false,
};

const currentUserReducer = (state = initialState, action) => {
  const auth = new Auth();

  switch (action.type) {
    case AT.AUTHORIZE_USER:
      return {
        profile: auth.getProfile(),
        token: auth.getToken(),
        isLoggedIn: auth.isAuthenticated(),
        sitewideAccess: auth.isAuthenticated() && auth.getProfile().permissions.includes('sitewide_access'),
      };

    case AT.DEAUTHORIZE_USER:
      return {
        profile: null,
        token: null,
        isLoggedIn: false,
        sitewideAccess: false,
      };

    default:
      return state;
  }
};

export default currentUserReducer;
