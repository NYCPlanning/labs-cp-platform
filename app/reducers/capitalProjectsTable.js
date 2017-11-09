import * as AT from '../constants/actionTypes';
import { defaultFilterDimensions } from '../capitalprojects/config';
import { getTableSql } from '../helpers/sqlbuilder/CapitalProjectsSqlBuilder';
import db_tables from '../db_tables';

const getDefaultFilters = () => JSON.parse(JSON.stringify(defaultFilterDimensions));

const initialState = {
  filterDimensions: getDefaultFilters(),
  sql: getTableSql(getDefaultFilters()),
  commitmentsSql: db_tables.cpdb.commitments,
  capitalProjectDetails: [],
  totalCount: 0,
  selectedCount: 0,
  filterBy: null,
  colSortDirs: { maprojid: 'DESC' },
};

const capitalProjectsTableReducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.FETCH_CAPITAL_PROJECT_TABLE_DETAILS.SUCCESS:
      return Object.assign({}, state, { capitalProjectDetails: action.payload });

    case AT.FETCH_CAPITAL_PROJECTS_TABLE_TOTAL_COUNT.SUCCESS:
      return Object.assign({}, state, { totalCount: action.payload[0].count });

    case AT.FETCH_CAPITAL_PROJECTS_TABLE_SELECTED_COUNT.SUCCESS:
      return Object.assign({}, state, { selectedCount: action.payload[0].count });

    case AT.RESET_CAPITAL_PROJECTS_TABLE_FILTES:
      return Object.assign({}, state, {
        filterDimensions: getDefaultFilters(),
        sql: getTableSql(getDefaultFilters()),
        commitmentsSql: `SELECT * FROM ${db_tables.cpdb.commitments} a WHERE a.maprojid IN (SELECT b.maprojid FROM (${getTableSql(getDefaultFilters())}) b)`,
      });

    case AT.SET_CAPITAL_PROJECTS_TABLE_FILTER_DIMENSION:
      const { filterDimension, values } = action.payload;
      const dimension = state.filterDimensions[filterDimension];

      const shouldChangeDisabledValue = filterDimension === 'magencyacro' ||
                                        filterDimension === 'sagencyacro' ||
                                        filterDimension === 'projecttype';

      const newDisabledValue = shouldChangeDisabledValue
        ? values.filter(value => value.checked === true).length <= 0
        : dimension.disabled;

      const filterDimensions = Object.assign({}, state.filterDimensions, {
        [filterDimension]: Object.assign({}, dimension, { values, disabled: newDisabledValue }),
      });

      return Object.assign({}, state, {
        filterDimensions,
        sql: getTableSql(filterDimensions),
        commitmentsSql: `SELECT * FROM ${db_tables.cpdb.commitments} a WHERE a.maprojid IN (SELECT b.maprojid FROM (${getTableSql(filterDimensions)}) b)`,
      });

    case AT.SET_CAPITAL_PROJECTS_TABLE_FILTER_BY:
      return Object.assign({}, state, { filterBy: action.payload.filterBy });

    case AT.SET_CAPITAL_PROJECTS_TABLE_SORT:
      return Object.assign({}, state, {
        colSortDirs: Object.assign({}, state.colSortDirs, {
          [action.payload.columnKey]: action.payload.sortDir,
        }),
      });

    default:
      return state;
  }
};

export default capitalProjectsTableReducer;
