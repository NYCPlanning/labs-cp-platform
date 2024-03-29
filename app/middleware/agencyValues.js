import * as AT from '../constants/actionTypes';
import * as cartoActions from '../actions/carto';

const agencyValuesMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === AT.FETCH_FACILITY_DETAILS.SUCCESS) {
    dispatch(cartoActions.fetchAgencyValues(action.payload.features[0], AT.FETCH_FACILITY_AGENCY_VALUES));
  }

  return next(action);
};

export default agencyValuesMiddleware;
