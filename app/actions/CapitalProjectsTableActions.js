import dispatcher from '../dispatcher';

const CapitalProjectsTableActions = {
  onFilterDimensionChange(filterDimension, values) {
    dispatcher.dispatch({
      type: 'CAPITALPROJECTS_TABLE_FILTERDIMENSION_CHANGE',
      filterDimension,
      values,
    });
  },

  onFilterBy(filterBy) {
    dispatcher.dispatch({
      type: 'CAPITALPROJECTS_TABLE_FILTERBY',
      filterBy,
    });
  },

  onSortChange(columnKey, sortDir) {
    dispatcher.dispatch({
      type: 'CAPITALPROJECTS_TABLE_SORTCHANGE',
      columnKey,
      sortDir,
    });
  },
};

export default CapitalProjectsTableActions;
