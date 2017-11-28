import * as AT from '../constants/actionTypes';
import * as cartoActions from './carto';
import { unionSql } from '../helpers/sqlbuilder/CBBudgetRequestsSqlBuilder';
// import db_tables from '../db_tables';

export const fetchDetails = requestId =>
  cartoActions.getFeature({
    tableName: unionSql(),
    column: 'regid',
    value: requestId,
  }, AT.FETCH_CB_BUDGET_REQUEST_DETAILS);

export const setFilterDimension = (filterDimension, values) => ({
  type: AT.SET_CB_BUDGET_REQUESTS_FILTER_DIMENSION,
  payload: { filterDimension, values },
});

export const setFilters = filterDimensions => ({
  type: AT.SET_CB_BUDGET_REQUESTS_FILTERS,
  payload: { filterDimensions },
});

export const resetFilter = () => ({
  type: AT.RESET_CB_BUDGET_REQUESTS_FILTER,
});
