import * as AT from '../constants/actionTypes';
import { getDefaultFilterDimensions } from '../facilities/config';
import { getSql } from '../helpers/sqlbuilder/FacilitiesSqlBuilder';

const defaultFilterDimensions = getDefaultFilterDimensions({ selected: 'all' });

const initialState = {
  filterDimensions: defaultFilterDimensions,
  sql: getSql(defaultFilterDimensions),
  selectedFeatures: [],
  facilityDetails: null,
  sources: [],
  totalCount: 0,
  selectedCount: 0,
  mapBounds: null,
};

const facilitiesReducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.FETCH_FACILITY_DETAILS.SUCCESS:
      return Object.assign({}, state, { facilityDetails: action.payload.features[0] });

    case AT.FETCH_FACILITY_AGENCY_VALUES.SUCCESS:
      return Object.assign({}, state, { sources: action.payload });

    case AT.FETCH_FACILITIES_TOTAL_COUNT.SUCCESS:
      return Object.assign({}, state, { totalCount: action.payload[0].count });

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

    case AT.SET_FACILITIES_FILTER_DIMENSION:
      const { filterDimension, values } = action.payload;
      const dimension = state.filterDimensions[filterDimension];

      if (filterDimension === 'radiusfilter') {
        dimension.disabled = !values.coordinates.length;
      }

      const shouldChangeDisabledValue = filterDimension === 'overabbrev' ||
                                        filterDimension === 'optype' ||
                                        filterDimension === 'proptype' ||
                                        filterDimension === 'censtract' ||
                                        filterDimension === 'nta' ||
                                        filterDimension === 'taz' ||
                                        filterDimension === 'council' ||
                                        filterDimension === 'firediv' ||
                                        filterDimension === 'firebn' ||
                                        filterDimension === 'fireconum' ||
                                        filterDimension === 'municourt' ||
                                        filterDimension === 'policeprecinct' ||
                                        filterDimension === 'schooldistrict' ||
                                        filterDimension === 'stateassemblydistrict' ||
                                        filterDimension === 'statesenatedistrict' ||
                                        filterDimension === 'congdist' ||
                                        filterDimension === 'borocode' ||
                                        filterDimension === 'commboard';

      const newDisabledValue = shouldChangeDisabledValue
        ? values.filter(value => value.checked === true).length <= 0
        : dimension.disabled;

      const filterDimensions = Object.assign({}, state.filterDimensions, {
        [filterDimension]: Object.assign({}, dimension, { values, disabled: newDisabledValue }),
      });

      return Object.assign({}, state, { filterDimensions, sql: getSql(filterDimensions) });

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
