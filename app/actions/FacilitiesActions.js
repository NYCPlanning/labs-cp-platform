import dispatcher from '../dispatcher';

const FacilitiesActions = {
  onFilterDimensionChange(filterDimension, values) {
    dispatcher.dispatch({
      type: 'FACILITIES_FILTERDIMENSION_CHANGE',
      filterDimension,
      values,
    });
  },

  setInitialFilters(filterDimensions) {
    dispatcher.dispatch({
      type: 'FACILITIES_SET_INITIAL_FILTERS',
      filterDimensions,
    });
  },

  selectAll() {
    dispatcher.dispatch({
      type: 'FACILITIES_SELECT_ALL',
    });
  },

  selectNone() {
    dispatcher.dispatch({
      type: 'FACILITIES_SELECT_NONE',
    });
  },

  fetchDetailData(uid) {
    dispatcher.dispatch({
      type: 'FACILITIES_FETCH_DETAIL_DATA',
      uid,
    });
  },

  resetFilter() {
    dispatcher.dispatch({
      type: 'FACILITIES_RESET_FILTER',
    });
  },

  setSelectedFeatures(features) {
    dispatcher.dispatch({
      type: 'FACILITIES_SET_SELECTED_FEATURES',
      features,
    });
  },
};

export default FacilitiesActions;
