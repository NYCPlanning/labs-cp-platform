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
    sql: `SELECT COUNT(*)
    FROM ${sqlConfig.tablename}
    WHERE
      the_geom IS NOT NULL
      AND
      u_net IS NOT NULL
      AND
      (
        dcp_status = 'Complete'
        OR dcp_status = 'Partial complete'
        OR dcp_status = 'Permit issued'
        OR dcp_status = 'Application filed'
        OR dcp_status = 'Complete (demolition)'
      )
      AND
      (
        dcp_dev_category = 'New Building'
        OR dcp_dev_category = 'Alteration'
        OR dcp_dev_category = 'Demolition'
      )
      AND
      (
        dcp_occ_category = 'Residential'
        OR dcp_occ_category = 'Other Accommodations'
      )
      AND x_outlier <> 'true'
      AND x_dup_flag = ''`,
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

export const resetFilter = () => ({
  type: AT.RESET_PIPELINE_FILTER,
});
