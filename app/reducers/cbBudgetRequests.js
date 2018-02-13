import * as AT from '../constants/actionTypes';
import { getSql, getPointsSql, getPolygonsSql } from '../helpers/sqlbuilder/CBBudgetRequestsSqlBuilder';

import agency_labels from './BudgetRequests/agency_labels';
import commdist_labels from '../helpers/labels/community_districts';

const totalcounts = require('../totalcounts.json');

const initialState = () => (
  Object.assign({}, {
    filterDimensions: {
      agencyacro: {
        type: 'multiSelect',
        disabled: true,
        values: JSON.parse(JSON.stringify(agency_labels)),
      },
      commdist: {
        type: 'multiSelect',
        disabled: true,
        values: JSON.parse(JSON.stringify(commdist_labels)),
      },
      top10: {
        type: 'top10',
        disabled: true,
        values: false,
      },
    },
    sql: getSql({}),
    pointsSql: getPointsSql({}),
    polygonsSql: getPolygonsSql({}),
    cbDetails: null,
    totalCount: totalcounts.cbbr,
    selectedCount: totalcounts.cbbr,
  })
);

const cbBudgetRequestsReducer = (state = initialState(), action) => {
  switch (action.type) {
    case AT.FETCH_CB_BUDGET_REQUEST_DETAILS.SUCCESS:
      return Object.assign({}, state, { cbDetails: action.payload.features[0] });

    case AT.RESET_SELECTED_FEATURES:
      return Object.assign({}, state, { cbDetails: null });

    case AT.FETCH_CB_BUDGET_REQUESTS_SELECTED_COUNT.SUCCESS:
      return Object.assign({}, state, { selectedCount: action.payload[0].count });

    case AT.RESET_CB_BUDGET_REQUESTS_FILTER:
      return Object.assign({}, state, {
        filterDimensions: initialState().filterDimensions,
        sql: getSql({}),
        pointsSql: getPointsSql({}),
        polygonsSql: getPolygonsSql({}),
      });

    case AT.SET_CB_BUDGET_REQUESTS_FILTER_DIMENSION: {
      const { filterDimension, values } = action.payload;
      const dimension = state.filterDimensions[filterDimension];

      if (filterDimension === 'radiusfilter') {
        dimension.disabled = !values.coordinates.length;
      }

      if (filterDimension === 'top10') {
        dimension.disabled = !values;
      }

      const shouldChangeDisabledValue = [
        'agencyacro',
        'commdist',
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
    }

    default:
      return state;
  }
};

export default cbBudgetRequestsReducer;
