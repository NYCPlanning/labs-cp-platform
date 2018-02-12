import * as AT from '../constants/actionTypes';

export const setSelectedFeatures = selectedFeatures => ({
  type: AT.SET_SELECTED_FEATURES,
  payload: { selectedFeatures },
});

export const resetSelectedFeatures = () => ({
  type: AT.RESET_SELECTED_FEATURES,
});
