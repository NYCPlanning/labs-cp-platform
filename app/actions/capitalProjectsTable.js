import * as AT from '../constants/actionTypes';
import { tableSqlConfig, getTableSql } from '../helpers/sqlbuilder/CapitalProjectsSqlBuilder';

export const fetchDetails = filterDimensions => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: getTableSql(filterDimensions),
    requestFormat: 'json',
    nextType: AT.FETCH_CAPITAL_PROJECT_TABLE_DETAILS,
  },
});

export const fetchTotalCount = () => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT COUNT(*) FROM ${tableSqlConfig.tableName}`,
    requestFormat: 'json',
    nextType: AT.FETCH_CAPITAL_PROJECTS_TABLE_TOTAL_COUNT,
  },
});

export const fetchSelectedCount = filterDimensions => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT count(*) FROM (${getTableSql(filterDimensions)}) a`,
    requestFormat: 'json',
    nextType: AT.FETCH_CAPITAL_PROJECTS_TABLE_SELECTED_COUNT,
  },
});

export const setFilterDimension = (filterDimension, values) => ({
  type: AT.SET_CAPITAL_PROJECTS_TABLE_FILTER_DIMENSION,
  payload: { filterDimension, values },
});

export const resetFilter = () => ({
  type: AT.RESET_CAPITAL_PROJECTS_TABLE_FILTER,
});

export const setTableSort = (columnKey, sortDir) => ({
  type: AT.SET_CAPITAL_PROJECTS_TABLE_SORT,
  payload: { columnKey, sortDir },
});

export const setTableFilterBy = filterBy => ({
  type: AT.SET_CAPITAL_PROJECTS_TABLE_FILTER_BY,
  payload: { filterBy },
});
