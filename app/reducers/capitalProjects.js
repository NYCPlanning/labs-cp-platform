import * as AT from '../constants/actionTypes';
import { defaultFilterDimensions } from './capitalprojects/config';
import { getSql, getPointsSql, getPolygonsSql } from '../helpers/sqlbuilder/CapitalProjectsSqlBuilder';

const totalcounts = require('../totalcounts.json');

const getDefaultFilters = () => JSON.parse(JSON.stringify(defaultFilterDimensions));

const initialState = {
  filterDimensions: getDefaultFilters(),
  sql: getSql(getDefaultFilters()),
  pointsSql: getPointsSql(getDefaultFilters()),
  polygonsSql: getPolygonsSql(getDefaultFilters()),
  selectedFeatures: [],
  totalCount: totalcounts.cpMapped,
  selectedCount: totalcounts.cpMapped,
  capitalProjectDetails: null,
  capitalProjectBudgets: null,
  capitalProjectCommitments: null,
  sources: [],
  costGroupData: [],
};

const capitalProjectsReducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.FETCH_CAPITAL_PROJECT_DETAILS.SUCCESS:
      return Object.assign({}, state, { capitalProjectDetails: action.payload.features[0] });

    case AT.FETCH_CAPITAL_PROJECT_BUDGETS.SUCCESS:
      return Object.assign({}, state, { capitalProjectBudgets: action.payload });

    case AT.FETCH_CAPITAL_PROJECT_COMMITMENTS.SUCCESS:
      return Object.assign({}, state, { capitalProjectCommitments: action.payload });

    case AT.RESET_SELECTED_FEATURES:
      return Object.assign({}, state, {
        capitalProjectDetails: null,
        capitalProjectBudgets: null,
        capitalProjectCommitments: null,
      });

    case AT.FETCH_CAPITAL_PROJECTS_SELECTED_COUNT.SUCCESS:
      return Object.assign({}, state, { selectedCount: action.payload[0].count });

    case AT.SET_SELECTED_CAPITAL_PROJECTS_FEATURES:
      return Object.assign({}, state, { selectedFeatures: action.payload.selectedFeatures });

    case AT.RESET_CAPITAL_PROJECTS_FILTER:
      return Object.assign({}, state, {
        filterDimensions: getDefaultFilters(),
        sql: getSql(getDefaultFilters()),
        pointsSql: getPointsSql(getDefaultFilters()),
        polygonsSql: getPolygonsSql(getDefaultFilters()),
      });

    case AT.SET_CAPITAL_PROJECTS_FILTER_DIMENSION: {
      const { filterDimension, values } = action.payload;
      const dimension = state.filterDimensions[filterDimension];

      if (filterDimension === 'radiusfilter') {
        dimension.disabled = !values.coordinates.length;
      }

      const shouldChangeDisabledValue = [
        'magencyacro',
        'sagencyacro',
        'projecttype',
        'censtract',
        'nta',
        'taz',
        'council',
        'firediv',
        'firebn',
        'fireconum',
        'municourt',
        'policeprecinct',
        'schooldistrict',
        'stateassemblydistrict',
        'statesenatedistrict',
        'congdist',
        'borocode',
        'commboard',
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

    case AT.SET_CAPITAL_PROJECTS_TABLE_FILTER_BY:
      return Object.assign({}, state, { filterBy: action.payload.filterBy });

    case AT.SET_CAPITAL_PROJECTS_TABLE_SORT:
      return Object.assign({}, state, {
        colSortDirs: Object.assign({}, state.colSortDirs, {
          [action.payload.columnKey]: action.payload.sortDir,
        }),
      });

    case AT.FETCH_COST_GROUP_DATA.SUCCESS:
      return Object.assign({}, state, { costGroupData: action.payload });

    default:
      return state;
  }
};

export default capitalProjectsReducer;
