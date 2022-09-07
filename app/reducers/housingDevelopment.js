import _ from 'lodash';

import * as AT from '../constants/actionTypes';
import { defaultFilterDimensions } from '../filter-configs/housing-config';
import { getSql } from '../helpers/sqlbuilder/HousingSqlBuilder';

const totalcounts = require('../config/totalcounts.json');
const getDefaultFilters = () => JSON.parse(JSON.stringify(defaultFilterDimensions));

// NOTE: how are these going to change with the new schema?
const isIssueDateDisabled = filterDimensions =>
filterDimensions.job_status.values
  .filter(value => value.checked && value.value === 'Filed')
  .length > 0;

const isCompletionDateDisabled = filterDimensions =>
filterDimensions.job_status.values
  .filter(value => value.checked && (value.value === 'Permit issued' || value.value === 'Filed'))
  .length > 0;

export const initialState = {
  filterDimensions: getDefaultFilters(),
  issueDateFilterDisabled: isIssueDateDisabled(getDefaultFilters()),
  completionDateFilterDisabled: isCompletionDateDisabled(getDefaultFilters()),
  sql: getSql(getDefaultFilters()),
  selectedFeatures: [],
  symbologyDimension: 'job_type',
  housingDetails: null,
  totalCount: totalcounts.housing,
  totalCountRaw: totalcounts.housingRaw,
  selectedCount: totalcounts.housing,
};

const housingReducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.FETCH_HOUSING_DEVELOPMENT_DETAILS.SUCCESS:
      return Object.assign({}, state, { housingDetails: action.payload.features[0] });

    case AT.RESET_SELECTED_FEATURES:
      return Object.assign({}, state, { housingDetails: null });

    case AT.FETCH_HOUSING_DEVELOPMENT_SELECTED_COUNT.SUCCESS:
      return Object.assign({}, state, { selectedCount: action.payload[0].count });

    case AT.SET_SELECTED_HOUSING_DEVELOPMENT_FEATURES:
      return Object.assign({}, state, { selectedFeatures: action.payload.selectedFeatures });

    case AT.SET_HOUSING_DEVELOPMENT_SYMBOLOGY:
      return Object.assign({}, state, { symbologyDimension: action.payload.symbologyDimension });

    case AT.RESET_HOUSING_DEVELOPMENT_FILTER:
      return Object.assign({}, state, {
        filterDimensions: getDefaultFilters(),
        issueDateFilterDisabled: initialState.issueDateFilterDisabled,
        completionDateFilterDisabled: initialState.completionDateFilterDisabled,
        sql: getSql(getDefaultFilters()),
      });

    case AT.SET_HOUSING_DEVELOPMENT_FILTER_DIMENSION: {
      const { filterDimension, values } = action.payload;
      const dimensions = _.cloneDeep(state.filterDimensions);

      dimensions[filterDimension].values = values;

      if (filterDimension === 'radiusfilter') {
        dimensions.radiusfilter.disabled = !values.coordinates.length;
      }

      // if dimension is status, check which items are included and disable/reset date dimensions accordingly
      if (filterDimension === 'job_status') {
        // Completion Slider
        if (isCompletionDateDisabled(dimensions)) {
          dimensions.datecomplt = getDefaultFilters().datecomplt;
          dimensions.datecomplt.disabled = true;
        } else {
          dimensions.datecomplt.disabled = false;
        }
        // issued slider
        if (isIssueDateDisabled(dimensions)) {
          dimensions.datepermit = getDefaultFilters().datepermit;
          dimensions.datepermit.disabled = true;
        } else {
          dimensions.datepermit.disabled = false;
        }
      }

      const shouldChangeDisabledValue = [
        'geo_boro',
        'geo_ntacode2020',
        'geo_cd',
        'geo_censustract2010',
        'geo_council',
        'geo_csd',
      ];

      const newDisabledValue = shouldChangeDisabledValue.includes(filterDimension)
        ? values.filter(value => value.checked === true).length <= 0
        : dimensions[filterDimension].disabled;

      const filterDimensions = Object.assign({}, dimensions, {
        [filterDimension]: Object.assign({}, dimensions[filterDimension], { values, disabled: newDisabledValue }),
      });

      return Object.assign({}, state, {
        filterDimensions,
        issueDateFilterDisabled: isIssueDateDisabled(filterDimensions),
        completionDateFilterDisabled: isCompletionDateDisabled(filterDimensions),
        sql: getSql(filterDimensions),
      });
    }

    default:
      return state;
  }
};

export default housingReducer;
