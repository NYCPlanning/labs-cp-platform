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

  onToggleAll() {
    dispatcher.dispatch({
      type: 'FACILITIES_TOGGLE_ALL_LAYERS',
    });
  },
};

export default FacilitiesActions;
