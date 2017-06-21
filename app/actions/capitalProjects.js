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

export const resetFilter = () => ({
  type: AT.RESET_CAPITAL_PROJECTS_FILTER,
});

export const fetchCostGroupData = (pointsSql, polygonsSql) => {
  const sql = `
      WITH ranges(range,i) AS (
        VALUES
          ('<$10K',0),
          ('10K-100K', 1),
          ('100K-1M',2),
          ('1M-10M',3),
          ('10M-100M',4),
          ('>100M',5)
      )

      SELECT a.range, a.i, count(b.range)
      FROM ranges a
      LEFT JOIN (
          SELECT
          CASE
              WHEN totalcommit < 10000 THEN '<$10K'
              WHEN totalcommit >= 10000 AND totalcommit < 100000 THEN '10K-100K'
              WHEN totalcommit >= 100000 AND totalcommit < 1000000 THEN '100K-1M'
              WHEN totalcommit >= 1000000 AND totalcommit < 10000000 THEN '1M-10M'
              WHEN totalcommit >= 10000000 AND totalcommit < 100000000 THEN '10M-100M'
              ELSE '>100M'
          END as range
        FROM (${pointsSql} UNION ALL ${polygonsSql}) x
      ) b
      ON a.range = b.range
      GROUP BY a.range, a.i
      ORDER BY a.i
    `;

  return {
    type: AT.CARTO_REQUEST,
    payload: {
      sql,
      requestFormat: 'json',
      nextType: AT.FETCH_COST_GROUP_DATA,
    }
  };
};
