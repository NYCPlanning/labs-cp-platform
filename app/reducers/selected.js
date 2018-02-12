import * as AT from '../constants/actionTypes';

const initialState = {
  features: [],
};

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.SET_SELECTED_FEATURES:
      return Object.assign({}, state, { features: action.payload.selectedFeatures });

    case AT.RESET_SELECTED_FEATURES:
      return Object.assign({}, state, { features: [] });

    default:
      return state;
  }
};

export default selectedReducer;
