import EventsEmitter from 'events';

import dispatcher from '../dispatcher';

import { defaultFilterDimensions } from '../pipeline/janelayer/config';

class PipelineStore extends EventsEmitter {
  constructor() {
    super();
    this.sql = 'something';
    this.filterDimensions = defaultFilterDimensions;
  }

  handleFilterDimensionChange(filterDimension, values) {
    this.filterDimensions[filterDimension] = values;
    this.emit('filterDimensionsChanged')

    // // before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component
    //
    // // if dimension is status, check which items are included and disable/reset date slider accordingly
    // if (dimension === 'dcp_pipeline_status') {
    //   const invalidValuesCompletion = values.filter(value => (
    //     (value.value === 'Permit issued' || value.value === 'Application filed') ? value.value : null
    //   ));
    //
    //
    //   // Completion Slider
    //   if (invalidValuesCompletion.length > 0 || values.length === 0) {
    //     this.state.filterDimensions.dob_cofo_date = [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')]; // eslint-disable-line
    //     this.state.completionDateFilterDisabled = true;
    //   } else {
    //     this.state.completionDateFilterDisabled = false;
    //   }
    //
    //   // Permit Issued Slider
    //   const invalidValuesIssued = values.filter(value => (
    //     (value.value === 'Application filed') ? value.value : null
    //   ));
    //
    //
    //   if (invalidValuesIssued.length > 0 || values.length === 0) {
    //     this.state.filterDimensions.dob_qdate = [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')]; // eslint-disable-line
    //     this.state.issueDateFilterDisabled = true;
    //   } else {
    //     this.state.issueDateFilterDisabled = false;
    //   }
    // }
    //
    // this.forceUpdate();
    // this.buildSQL();
  }

  getFilterDimensions() {
    return this.filterDimensions;
  }

  handleActions(action) {
    switch (action.type) {
      case 'PIPELINE_FILTERDIMENSION_CHANGE': {
        console.log('received PIPELINE_FILTERDIMENSION_CHANGE');
        this.handleFilterDimensionChange(action.filterDimension, action.values)
      }
    }

    // handle appropriate actions
  }
}

const pipelineStore = new PipelineStore();
dispatcher.register(pipelineStore.handleActions.bind(pipelineStore));

export default pipelineStore;
