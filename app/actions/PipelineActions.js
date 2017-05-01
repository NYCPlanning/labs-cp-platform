import dispatcher from '../dispatcher';

const PipelineActions = {
  onFilterDimensionChange(filterDimension, values) {
    dispatcher.dispatch({
      type: 'PIPELINE_FILTERDIMENSION_CHANGE',
      filterDimension,
      values,
    });
  },

  onSymbologyDimensionChange(symbologyDimension) {
    dispatcher.dispatch({
      type: 'PIPELINE_SYMBOLOGYDIMENSION_CHANGE',
      symbologyDimension,
    });
  },

  fetchDetailData(cartodb_id) {
    dispatcher.dispatch({
      type: 'PIPELINE_FETCH_DETAIL_DATA',
      cartodb_id,
    });
  },

  resetFilter() {
    dispatcher.dispatch({
      type: 'PIPELINE_RESET_FILTER',
    });
  },

  setSelectedFeatures(features) {
    dispatcher.dispatch({
      type: 'PIPELINE_SET_SELECTED_FEATURES',
      features,
    });
  },
};

export default PipelineActions;
