import * as AT from '../constants/actionTypes';
import * as cartoActions from './carto';
import { sqlConfig, unionSql } from '../helpers/sqlbuilder/CapitalProjectsSqlBuilder';

export const fetchDetails = capitalProjectId =>
  cartoActions.getFeature({
    tableName: sqlConfig.combinedTable,
    column: 'maprojid',
    value: capitalProjectId,
  }, AT.FETCH_CAPITAL_PROJECT_DETAILS);

export const fetchBudgets = capitalProjectId => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT * FROM cpdb_budgets WHERE maprojid = '${capitalProjectId}'`,
    requestFormat: 'json',
    nextType: AT.FETCH_CAPITAL_PROJECT_BUDGETS,
  },
});

export const fetchCommitments = capitalProjectId => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT * FROM cpdb_commitments WHERE maprojid = '${capitalProjectId}' ORDER BY to_date(plancommdate,'MM/YY')`,
    requestFormat: 'json',
    nextType: AT.FETCH_CAPITAL_PROJECT_COMMITMENTS,
  },
});

export const fetchTotalPointsCount = () => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT COUNT(*) FROM ${sqlConfig.pointsTablename}`,
    requestFormat: 'json',
    nextType: AT.FETCH_CAPITAL_PROJECTS_TOTAL_POINTS_COUNT,
  },
});

export const fetchTotalPolygonsCount = () => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT COUNT(*) FROM ${sqlConfig.polygonsTablename}`,
    requestFormat: 'json',
    nextType: AT.FETCH_CAPITAL_PROJECTS_TOTAL_POLYGONS_COUNT,
  },
});

export const fetchSelectedCount = filterDimensions => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT count(*) FROM (${unionSql(filterDimensions)}) a`,
    requestFormat: 'json',
    nextType: AT.FETCH_CAPITAL_PROJECTS_SELECTED_COUNT,
  },
});

export const setSelectedFeatures = selectedFeatures => ({
  type: AT.SET_SELECTED_CAPITAL_PROJECTS_FEATURES,
  payload: { selectedFeatures },
});

export const setFilterDimension = (filterDimension, values) => ({
  type: AT.SET_CAPITAL_PROJECTS_FILTER_DIMENSION,
  payload: { filterDimension, values },
});

export const resetFilters = () => ({
  type: AT.RESET_CAPITAL_PROJECTS_FILTERS,
});
