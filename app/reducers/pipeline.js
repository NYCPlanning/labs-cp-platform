import * as AT from '../constants/actionTypes';
import { defaultFilterDimensions } from '../pipeline/config';
import { getSql } from '../helpers/sqlbuilder/PipelineSqlBuilder';

const initialState = {
  filterDimensions: defaultFilterDimensions,
  sql: getSql(defaultFilterDimensions),
  selectedFeatures: [],
  symbologyDimension: 'dcp_permit_type',
  pipelineDetails: null,
  sources: [],
  totalCount: 0,
  selectedCount: 0,
};

const pipelineReducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.FETCH_PIPELINE_DETAIL.SUCCESS:
      return Object.assign({}, state, { pipelineDetails: action.payload });

    case AT.FETCH_PIPELINE_TOTAL_COUNT.SUCCESS:
      return Object.assign({}, state, { totalCount: action.payload[0].count });

    case AT.FETCH_PIPELINE_SELECTED_COUNT.SUCCESS:
      return Object.assign({}, state, { selectedCount: action.payload[0].count });

    case AT.SET_SELECTED_PIPELINE_FEATURES:
      return Object.assign({}, state, { selectedFeatures: action.payload.selectedFeatures });

    case AT.SET_PIPELINE_SYMBOLOGY:
      return Object.assign({}, state, { symbologyDimension: action.paypload.symbologyDimension });

    case AT.RESET_PIPELINE_FILTERS:
      return Object.assign({}, state, {
        filterDimensions: initialState.filterDimensions,
        sql: getSql(initialState.filterDimensions),
      });

    case AT.SET_PIPELINE_FILTER_DIMENSION:
      return ;

    default:
      return state;
  }
}

export default pipelineReducer;
