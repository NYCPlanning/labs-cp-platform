import * as AT from '../constants/actionTypes';

export const initialState = {
  scaDetails: {},
};

const scaReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.FETCH_SCA_DETAILS.SUCCESS:
      return Object.assign({}, state, { scaDetails: action.payload.features[0] });

    default:
      return state;
  }
};

export default scaReducer;
