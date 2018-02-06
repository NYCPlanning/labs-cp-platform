import * as AT from '../constants/actionTypes';
import * as cartoActions from './carto';
import { sqlConfig, getSql } from '../helpers/sqlbuilder/FacilitiesSqlBuilder';

export const fetchFacilityDetails = (facilityId, facilityRoute = 'facility') => {
  if (facilityRoute === 'facility') {
    return cartoActions.getFeature({
      tableName: sqlConfig.tablename,
      column: 'uid',
      value: facilityId,
    }, AT.FETCH_FACILITY_DETAILS);
  }

  if (facilityRoute === 'pops') {
    return cartoActions.getPops({
      tableName: sqlConfig.tablename,
      value: facilityId,
    }, AT.FETCH_FACILITY_DETAILS);
  }
};

export const fetchPopsDetails = (popsId) => {
  return cartoActions.getPopsDetails(popsId, AT.FETCH_POPS_DETAILS);
};

export const fetchTotalCount = () => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT COUNT(*) FROM ${sqlConfig.tablename}`,
    requestFormat: 'json',
    nextType: AT.FETCH_FACILITIES_TOTAL_COUNT,
  },
});

export const fetchSelectedCount = filterDimensions => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT COUNT(*) FROM (${getSql(filterDimensions)}) a`,
    requestFormat: 'json',
    nextType: AT.FETCH_FACILITIES_SELECTED_COUNT,
  },
});

export const setSelectedFeatures = selectedFeatures => ({
  type: AT.SET_SELECTED_FACILITIES_FEATURES,
  payload: { selectedFeatures },
});

export const setFilters = filterDimensions => ({
  type: AT.SET_FACILITIES_FILTERS,
  payload: { filterDimensions },
});

export const setFilterDimension = (filterDimension, values) => ({
  type: AT.SET_FACILITIES_FILTER_DIMENSION,
  payload: { filterDimension, values },
});

export const resetFilter = () => ({
  type: AT.RESET_FACILITIES_FILTER,
});

export const fetchNYCBounds = id => ({
  type: AT.CARTO_REQUEST,
  payload: {
    sql: `SELECT ST_Extent(the_geom) FROM support_admin_ntaboundaries WHERE ntacode = '${id}'`,
    requestFormat: 'json',
    nextType: AT.FETCH_NYC_BOUNDS,
  },
});
