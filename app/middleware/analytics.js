import * as AT from '../constants/actionTypes';
import appConfig from '../helpers/appConfig';
import ReactGA from 'react-ga';

// ReactGA.initialize(appConfig.ga_tracking_code);

const analyticsMiddleware = ({ getState, dispatch }) => next => (action) => {
  if (action.type === AT.AUTHORIZE_USER) {
    ReactGA.set({ userId: action.payload.profile.id });
  }

  if (action.type === AT.DEAUTHORIZE_USER) {
    ReactGA.set({ userId: null });
  }

  if (action.type === AT.SET_FACILITIES_FILTER_DIMENSION) {
    ReactGA.event({
      category: 'facilities-explorer',
      action: 'set-filter',
    });
  }

  return next(action);
};

export default analyticsMiddleware;
