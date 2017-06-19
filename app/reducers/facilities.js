import * as AT from '../constants/actionTypes';
import { defaultFilterDimensions } from '../facilities/config';
import { getSql } from '../helpers/sqlbuilder/FacilitiesSqlBuilder';

const initialState = {
  filterDimensions: defaultFilterDimensions,
  sql: getSql(defaultFilterDimensions),
  selectedFeatures: [],
  facilityDetails: null,
  sources: [],
  totalCount: 0,
  selectedCount: 0,
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
        sql: getSql(action.payload.filterDimensions)
      });

    case AT.RESET_FACILITIES_FILTERS:
      return Object.assign({}, state, {
        filterDimensions: initialState.filterDimensions,
        sql: getSql(initialState.filterDimensions)
      });

    case AT.SET_FACILITIES_FILTER_DIMENSION:
      const { filterDimension, values } = action.payload;
      const dimension = state.filterDimensions[filterDimension];

      const shouldChangeDisabledValue = filterDimension === 'overabbrev' ||
                                        filterDimension === 'optype' ||
                                        filterDimension === 'proptype';

      const newDisabledValue = shouldChangeDisabledValue
        ? values.filter(value => value.checked === true).length <= 0
        : dimension.disabled;

      const filterDimensions = Object.assign({}, state.filterDimensions, {
        [filterDimension]: Object.assign({}, dimension, { values, disabled: newDisabledValue })
      });

      return Object.assign({}, state, { filterDimensions, sql: getSql(filterDimensions) });

    default:
      return state;
  }
};

export default facilitiesReducer;
