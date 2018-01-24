import * as AT from '../constants/actionTypes';

export const initialState = {
  centerOnGeometry: null,
};

const mapReducer = (state = initialState, action) => {
  if (action.type === AT.FETCH_FACILITY_DETAILS.SUCCESS ||
      action.type === AT.FETCH_CAPITAL_PROJECT_DETAILS.SUCCESS ||
      action.type === AT.FETCH_CB_BUDGET_REQUEST_DETAILS.SUCCESS ||
      action.type === AT.FETCH_HOUSING_DEVELOPMENT_DETAILS.SUCCESS ||
      action.type === AT.FETCH_SCA_DETAILS.SUCCESS) {
    return Object.assign({}, state, { centerOnGeometry: action.payload.features[0].geometry });
  }

  return state;
};

export default mapReducer;
