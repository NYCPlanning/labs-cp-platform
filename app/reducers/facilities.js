import * as AT from '../constants/actionTypes';
import getDefaultFilterDimensions from '../facilities/config';
import { getSql } from '../helpers/sqlbuilder/FacilitiesSqlBuilder';

const totalcounts = require('../config/totalcounts.json');

const defaultFilterDimensions = getDefaultFilterDimensions({ selected: 'all' });

const initialState = {
  filterDimensions: defaultFilterDimensions,
  sql: getSql(defaultFilterDimensions),
  selectedFeatures: [],
  facilityDetails: {},
  popsDetails: {},
  sources: [],
  totalCount: totalcounts.facilities,
  selectedCount: totalcounts.facilities,
  mapBounds: null,
};

const facilitiesReducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.FETCH_FACILITY_DETAILS.SUCCESS:
      return Object.assign({}, state, { facilityDetails: action.payload.features[0] });

    case AT.RESET_SELECTED_FEATURES:
      return Object.assign({}, state, { facilityDetails: null });

    case AT.FETCH_POPS_DETAILS.SUCCESS:
      return Object.assign({}, state, { popsDetails: action.payload.features[0] });

    case AT.FETCH_FACILITY_AGENCY_VALUES.SUCCESS:
      return Object.assign({}, state, { sources: action.payload });

    case AT.FETCH_FACILITIES_SELECTED_COUNT.SUCCESS:
      return Object.assign({}, state, { selectedCount: action.payload[0].count });

    case AT.SET_SELECTED_FACILITIES_FEATURES:
      return Object.assign({}, state, { selectedFeatures: action.payload.selectedFeatures });

    case AT.SET_FACILITIES_FILTERS:
      return Object.assign({}, state, {
        filterDimensions: action.payload.filterDimensions,
        sql: getSql(action.payload.filterDimensions),
      });

    case AT.RESET_FACILITIES_FILTER:
      return Object.assign({}, state, {
        filterDimensions: getDefaultFilterDimensions({ selected: 'all' }),
        sql: getSql(getDefaultFilterDimensions({ selected: 'all' })),
      });

    case AT.SET_FACILITIES_FILTER_DIMENSION: {
      const { filterDimension, values } = action.payload;
      const dimension = state.filterDimensions[filterDimension];

      if (filterDimension === 'radiusfilter') {
        dimension.disabled = !values.coordinates.length;
      }

      const shouldChangeDisabledValue = [
        'overabbrev',
        'optype',
        'nta2020',
        'cd',
        'censtract',
        'council',
        'admin_policeprecinct',
        'admin_schooldistrict',
        'borocode',
      ];

      const newDisabledValue = shouldChangeDisabledValue.includes(filterDimension)
        ? values.filter(value => value.checked === true).length <= 0
        : dimension.disabled;


      const filterDimensions = Object.assign({}, state.filterDimensions, {
        [filterDimension]: Object.assign({}, dimension, { values, disabled: newDisabledValue }),
      });

      return Object.assign({}, state, {
        filterDimensions,
        sql: getSql(filterDimensions),
      });
    }

    case AT.FETCH_NYC_BOUNDS.SUCCESS:
      return Object.assign({}, state, {
        mapBounds: action.payload[0]
          .st_extent
          .match(/\(([^)]+)\)/)[1]
          .split(',')
          .map(pair => pair.split(' ')),
      });

    default:
      return state;
  }
};

export default facilitiesReducer;
