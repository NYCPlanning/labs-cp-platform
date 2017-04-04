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
};

export default PipelineActions;
