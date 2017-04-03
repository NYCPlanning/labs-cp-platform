import dispatcher from '../dispatcher';

const PipelineActions = {
  onFilterDimensionChange(filterDimension, values) {
    dispatcher.dispatch({
      type: 'PIPELINE_FILTERDIMENSION_CHANGE',
      filterDimension,
      values,
    });
  },
};

export default PipelineActions;
