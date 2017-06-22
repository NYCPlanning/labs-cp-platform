import * as AT from '../constants/actionTypes';
import { defaultFilterDimensions } from '../pipeline/config';
import { getSql } from '../helpers/sqlbuilder/PipelineSqlBuilder';
import _ from 'lodash';

const getDefaultFilters = () => JSON.parse(JSON.stringify(defaultFilterDimensions));

const isIssueDateDisabled = filterDimensions =>
filterDimensions.dcp_pipeline_status.values
  .filter(value => value.checked && value.value === 'Application filed')
  .length > 0;

const isCompletionDateDisabled = filterDimensions =>
filterDimensions.dcp_pipeline_status.values
  .filter(value => value.checked && (value.value === 'Permit issued' || value.value === 'Application filed'))
  .length > 0;

export const initialState = {
  filterDimensions: getDefaultFilters(),
  issueDateFilterDisabled: isIssueDateDisabled(getDefaultFilters()),
  completionDateFilterDisabled: isCompletionDateDisabled(getDefaultFilters()),
  sql: getSql(getDefaultFilters()),
  selectedFeatures: [],
  symbologyDimension: 'dcp_permit_type',
  pipelineDetails: null,
  totalCount: 0,
  selectedCount: 0,
};

const pipelineReducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.FETCH_PIPELINE_DETAILS.SUCCESS:
      return Object.assign({}, state, { pipelineDetails: action.payload.features[0] });

    case AT.FETCH_PIPELINE_TOTAL_COUNT.SUCCESS:
      return Object.assign({}, state, { totalCount: action.payload[0].count });

    case AT.FETCH_PIPELINE_SELECTED_COUNT.SUCCESS:
      return Object.assign({}, state, { selectedCount: action.payload[0].count });

    case AT.SET_SELECTED_PIPELINE_FEATURES:
      return Object.assign({}, state, { selectedFeatures: action.payload.selectedFeatures });

    case AT.SET_PIPELINE_SYMBOLOGY:
      return Object.assign({}, state, { symbologyDimension: action.payload.symbologyDimension });

    case AT.RESET_PIPELINE_FILTER:
      return Object.assign({}, state, {
        filterDimensions: getDefaultFilters(),
        issueDateFilterDisabled: initialState.issueDateFilterDisabled,
        completionDateFilterDisabled: initialState.completionDateFilterDisabled,
        sql: getSql(getDefaultFilters()),
      });

    case AT.SET_PIPELINE_FILTER_DIMENSION:
      const { filterDimension, values } = action.payload;
      const dimensions = _.cloneDeep(state.filterDimensions);

      dimensions[filterDimension].values = values;

      // if dimension is status, check which items are included and disable/reset date dimensions accordingly
      if (filterDimension === 'dcp_pipeline_status') {
        // Completion Slider
        if (isCompletionDateDisabled(dimensions)) {
          dimensions.dob_cofo_date = getDefaultFilters().dob_cofo_date;
          dimensions.dob_cofo_date.disabled = true;
        } else {
          dimensions.dob_cofo_date.disabled = false;
        }
        // issued slider
        if (isIssueDateDisabled(dimensions)) {
          dimensions.dob_qdate = getDefaultFilters().dob_qdate;
          dimensions.dob_qdate.disabled = true;
        } else {
          dimensions.dob_qdate.disabled = false;
        }
      }

      return Object.assign({}, state, {
        filterDimensions: dimensions,
        issueDateFilterDisabled: isIssueDateDisabled(dimensions),
        completionDateFilterDisabled: isCompletionDateDisabled(dimensions),
        sql: getSql(dimensions)
      });

    default:
      return state;
  }
};

export default pipelineReducer;
