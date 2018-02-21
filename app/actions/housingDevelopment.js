import * as AT from '../constants/actionTypes';
import * as cartoActions from './carto';
import { sqlConfig, getSql } from '../helpers/sqlbuilder/HousingSqlBuilder';
import db_tables from '../config/db_tables';

export const fetchDetails = cartodbId =>
  cartoActions.getFeature({
    tableName: sqlConfig.tablename,
    column: 'dob_job_number',
    value: cartodbId,
  }, AT.FETCH_HOUSING_DEVELOPMENT_DETAILS);

export const fetchSelectedCount = filterDimensions => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT COUNT(*) FROM (${getSql(filterDimensions)}) a`,
    requestFormat: 'json',
    nextType: AT.FETCH_HOUSING_DEVELOPMENT_SELECTED_COUNT,
  },
});

export const setSelectedFeatures = selectedFeatures => ({
  type: AT.SET_SELECTED_HOUSING_DEVELOPMENT_FEATURES,
  payload: { selectedFeatures },
});

export const setFilterDimension = (filterDimension, values) => ({
  type: AT.SET_HOUSING_DEVELOPMENT_FILTER_DIMENSION,
  payload: { filterDimension, values },
});

export const setSymbology = symbologyDimension => ({
  type: AT.SET_HOUSING_DEVELOPMENT_SYMBOLOGY,
  payload: { symbologyDimension },
});

export const resetFilter = () => ({
  type: AT.RESET_HOUSING_DEVELOPMENT_FILTER,
});
