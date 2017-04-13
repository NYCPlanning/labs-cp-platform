import dispatcher from '../dispatcher';

const CapitalProjectsTableActions = {
  onFilterDimensionChange(filterDimension, values) {
    dispatcher.dispatch({
      type: 'CAPITALPROJECTS_TABLE_FILTERDIMENSION_CHANGE',
      filterDimension,
      values,
    });
  },
};

export default CapitalProjectsTableActions;
