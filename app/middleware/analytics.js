import * as AT from '../constants/actionTypes';
import ga from '../helpers/ga';

const analyticsMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  if (action.type === AT.SET_FACILITIES_FILTER_DIMENSION) {
    ga.event({
      category: 'facilities-explorer',
      action: 'set-filter',
    });
  }

  return next(action);
};

export default analyticsMiddleware;
