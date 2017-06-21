import * as AT from '../constants/actionTypes';
import * as cartoActions from './carto';
import { sqlConfig, getSql } from '../helpers/sqlbuilder/PipelineSqlBuilder';

export const fetchDetails = cartodbId =>
  cartoActions.getFeature({
    tableName: sqlConfig.tablename,
    column: 'cartodb_id',
    value: cartodbId,
  }, AT.FETCH_PIPELINE_DETAILS);

export const fetchTotalCount = () => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT COUNT(*) FROM ${sqlConfig.tablename}`,
    requestFormat: 'json',
    nextType: AT.FETCH_PIPELINE_TOTAL_COUNT,
  },
});

export const fetchSelectedCount = filterDimensions => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT count(*) FROM (${getSql(filterDimensions)}) a`,
    requestFormat: 'json',
    nextType: AT.FETCH_PIPELINE_SELECTED_COUNT,
  },
});

export const setSelectedFeatures = selectedFeatures => ({
  type: AT.SET_SELECTED_PIPELINE_FEATURES,
  payload: { selectedFeatures },
});

export const setFilterDimension = (filterDimension, values) => ({
  type: AT.SET_PIPELINE_FILTER_DIMENSION,
  payload: { filterDimension, values },
});

export const setSymbology = symbologyDimension => ({
  type: AT.SET_PIPELINE_SYMBOLOGY,
  payload: { symbologyDimension },
});

export const resetFilters = () => ({
  type: AT.RESET_PIPELINE_FILTERS,
});
