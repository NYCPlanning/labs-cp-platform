import dispatcher from '../dispatcher';

const FacilitiesActions = {
  onFilterDimensionChange(filterDimension, values) {
    dispatcher.dispatch({
      type: 'FACILITIES_FILTERDIMENSION_CHANGE',
      filterDimension,
      values,
    });
  },
};

export default FacilitiesActions;
