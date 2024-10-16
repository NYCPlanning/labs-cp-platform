import ReactGA from 'react-ga';
import ReactGA4 from "react-ga4";
import _ from 'lodash';

import * as AT from '../constants/actionTypes';

// ReactGA.initialize(appConfig.ga_tracking_code);

const analyticsMiddleware = () => next => (action) => {
  if (action.type === AT.AUTHORIZE_USER) {
    ReactGA.set({
      userId: action.payload.profile.user_id,
      dimension1: _.get(action.payload.profile, 'user_metadata.agency', 'Unknown'),
    });
    ReactGA4.set({
      userId: action.payload.profile.user_id,
      dimension1: _.get(action.payload.profile, 'user_metadata.agency', 'Unknown'),
    });
  }

  if (action.type === AT.DEAUTHORIZE_USER) {
    ReactGA.set({ userId: null, dimension1: null });
    ReactGA4.set({ userId: null, dimension1: null });
  }

  if (action.type === AT.SET_FACILITIES_FILTER_DIMENSION) {
    ReactGA.event({
      category: 'facilities-explorer',
      action: 'set-filter',
    });
    ReactGA4.event({
      category: 'facilities-explorer',
      action: 'set-filter',
    });
  }

  return next(action);
};

export default analyticsMiddleware;
