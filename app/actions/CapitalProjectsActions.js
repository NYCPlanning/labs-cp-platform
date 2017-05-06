import dispatcher from '../dispatcher';

const CapitalProjectsActions = {
  onFilterDimensionChange(filterDimension, values) {
    dispatcher.dispatch({
      type: 'CAPITALPROJECTS_FILTERDIMENSION_CHANGE',
      filterDimension,
      values,
    });
  },

  fetchDetailData(id) {
    dispatcher.dispatch({
      type: 'CAPITALPROJECTS_FETCH_DETAIL_DATA',
      id,
    });
  },

  resetFilter() {
    dispatcher.dispatch({
      type: 'CAPTIALPROJECTS_RESET_FILTER',
    });
  },

  setSelectedFeatures(features) {
    dispatcher.dispatch({
      type: 'CAPTIALPROJECTS_SET_SELECTED_FEATURES',
      features,
    });
  },
};

export default CapitalProjectsActions;
