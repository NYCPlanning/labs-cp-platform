import update from 'react/lib/update';
import * as AT from '../constants/actionTypes';
import { defaultFilterDimensions, defaultLayerConfig } from '../capitalprojects/config';
import { getSql, getPointsSql, getPolygonsSql } from '../helpers/sqlbuilder/CapitalProjectsSqlBuilder';

const getMapConfig = (filterDimensions) => {
  return update(defaultLayerConfig, {
    sources: {
      0: {
        options: {
          sql: { $set: [getPointsSql(filterDimensions), getPolygonsSql(filterDimensions)] },
        },
      },
    },
  })
};

const initialState = {
  filterDimensions: defaultFilterDimensions,
  sql: getSql(defaultFilterDimensions),
  pointsSql: getPointsSql(defaultFilterDimensions),
  polygonsSql: getPolygonsSql(defaultFilterDimensions),
  mapConfig: getMapConfig(defaultFilterDimensions),
  selectedFeatures: [],
  pointsTotalCount: 0,
  polygonsTotalCount: 0,
  selectedCount: 0,
  capitalProjectDetails: null,
  capitalProjectBudgets: null,
  capitalProjectCommitments: null,
  sources: [],
};

const capitalProjectsReducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.FETCH_CAPITAL_PROJECT_DETAILS.SUCCESS:
      return Object.assign({}, state, { capitalProjectDetails: action.payload });

    case AT.FETCH_CAPITAL_PROJECT_BUDGETS.SUCCESS:
      return Object.assign({}, state, { capitalProjectBudgets: action.payload });

    case AT.FETCH_CAPITAL_PROJECT_COMMITMENTS.SUCCESS:
      return Object.assign({}, state, { capitalProjectCommitments: action.payload });

    case AT.FETCH_CAPITAL_PROJECTS_TOTAL_POINTS_COUNT.SUCCESS:
      return Object.assign({}, state, { pointsTotalCount: action.payload[0].count });

    case AT.FETCH_CAPITAL_PROJECTS_TOTAL_POLYGONS_COUNT.SUCCESS:
      return Object.assign({}, state, { polygonsTotalCount: action.payload[0].count });

    case AT.FETCH_CAPITAL_PROJECTS_SELECTED_COUNT.SUCCESS:
      return Object.assign({}, state, { selectedCount: action.payload[0].count });

    case AT.SET_SELECTED_CAPITAL_PROJECTS_FEATURES:
      return Object.assign({}, state, {
        selectedFeatures: action.payload.selectedFeatures,
        mapConfig: getMapConfig(state.filterDimensions)
      });

    case AT.RESET_CAPITAL_PROJECTS_FILTERS:
      return Object.assign({}, state, {
        filterDimensions: initialState.filterDimensions,
        sql: getSql(initialState.filterDimensions),
        pointsSql: getPointsSql(initialState.filterDimensions),
        polygonsSql: getPolygonsSql(initialState.filterDimensions),
        mapConfig: getMapConfig(initialState.filterDimensions),
      });

    case AT.SET_CAPITAL_PROJECTS_FILTER_DIMENSION:
      const { filterDimension, values } = action.payload;
      const dimension = state.filterDimensions[filterDimension];

      const shouldChangeDisabledValue = filterDimension === 'magencyacro' ||
                                        filterDimension === 'sagencyacro' ||
                                        filterDimension === 'projecttype';

      const newDisabledValue = shouldChangeDisabledValue
        ? values.filter(value => value.checked === true).length <= 0
        : dimension.disabled;

      const filterDimensions = Object.assign({}, state.filterDimensions, {
        [filterDimension]: Object.assign({}, dimension, { values, disabled: newDisabledValue })
      });

      return Object.assign({}, state, {
        filterDimensions,
        sql: getSql(filterDimensions),
        pointsSql: getPointsSql(filterDimensions),
        polygonsSql: getPolygonsSql(filterDimensions),
        mapConfig: getMapConfig(filterDimensions),
      });

    case AT.SET_CAPITAL_PROJECTS_TABLE_FILTER_BY:
      return Object.assign({}, state, { filterBy: action.payload.filterBy });

    case AT.SET_CAPITAL_PROJECTS_TABLE_SORT:
      return Object.assign({}, state, {
        colSortDirs: Object.assign({}, state.colSortDirs, {
          [action.payload.columnKey]: action.payload.sortDir
        })
      });

    default:
      return state;
  }
};

export default capitalProjectsReducer;
