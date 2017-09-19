import * as AT from '../constants/actionTypes';

const initialState = {
  profile: null,
  token: null,
  isLoggedIn: false,
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.AUTHORIZE_USER:
      return {
        profile: action.payload.profile,
        token: action.payload.token,
        isLoggedIn: true,
      };

    case AT.DEAUTHORIZE_USER:
      console.log('deauth currentUser.js');
      return {
        profile: null,
        token: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default currentUserReducer;
