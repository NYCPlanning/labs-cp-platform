import * as AT from '../constants/actionTypes';
import appConfig from '../helpers/appConfig';
import ReactGA from 'react-ga';
import _ from 'lodash';

// ReactGA.initialize(appConfig.ga_tracking_code);

const analyticsMiddleware = ({ getState, dispatch }) => next => (action) => {
  if (action.type === AT.AUTHORIZE_USER) {
    ReactGA.set({
      userId: action.payload.profile.user_id,
      dimension1: _.get(action.payload.profile, 'user_metadata.agency', 'Unknown'),
    });
  }

  if (action.type === AT.DEAUTHORIZE_USER) {
    ReactGA.set({ userId: null, dimension1: null });
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
