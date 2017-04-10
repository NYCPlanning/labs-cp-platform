import dispatcher from '../dispatcher';

const CapitalProjectsActions = {
  onFilterDimensionChange(filterDimension, values) {
    dispatcher.dispatch({
      type: 'CAPITALPROJECTS_FILTERDIMENSION_CHANGE',
      filterDimension,
      values,
    });
  },
};

export default CapitalProjectsActions;
