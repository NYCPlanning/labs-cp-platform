import * as AT from '../constants/actionTypes';
import { getSql, getPointsSql, getPolygonsSql } from '../helpers/sqlbuilder/CBBudgetRequestsSqlBuilder';

import agency_labels from './BudgetRequests/agency_labels';

const initialState = {
  filterDimensions: {
    agencyacro: {
      type: 'multiSelect',
      disabled: true,
      values: agency_labels,
    },
  },
  sql: getSql({}),
  pointsSql: getPointsSql({}),
  polygonsSql: getPolygonsSql({}),
  cbDetails: null,
};

const cbBudgetRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.FETCH_CB_BUDGET_REQUEST_DETAILS.SUCCESS:
      return Object.assign({}, state, { cbDetails: action.payload.features[0] });

    case AT.SET_CAPITAL_PROJECTS_FILTER_DIMENSION:
      const { filterDimension, values } = action.payload;
      const dimension = state.filterDimensions[filterDimension];

      if (filterDimension === 'radiusfilter') {
        dimension.disabled = !values.coordinates.length;
      }

      const shouldChangeDisabledValue = [
        'agencyacro',
      ];

      const newDisabledValue = shouldChangeDisabledValue.includes(filterDimension)
        ? values.filter(value => value.checked === true).length <= 0
        : dimension.disabled;

      const filterDimensions = Object.assign({}, state.filterDimensions, {
        [filterDimension]: Object.assign({}, dimension, { values, disabled: newDisabledValue }),
      });

      return Object.assign({}, state, {
        filterDimensions,
        sql: getSql(filterDimensions),
        pointsSql: getPointsSql(filterDimensions),
        polygonsSql: getPolygonsSql(filterDimensions),
      });

    default:
      return state;
  }
};

export default cbBudgetRequestsReducer;
