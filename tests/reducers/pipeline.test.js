import _ from 'lodash';
import * as actions from '../../app/actions/pipeline';
import pipelineReducer, { initialState } from '../../app/reducers/pipeline';

describe('reducers/pipeline', () => {
  test('AT.FETCH_PIPELINE_DETAILS.SUCCESS', () =>
    expect(pipelineReducer(initialState, actions.fetchDetails('cartodbId'))).toMatchSnapshot());

  test('AT.FETCH_PIPELINE_TOTAL_COUNT.SUCCESS', () =>
    expect(pipelineReducer(initialState, actions.fetchTotalCount())).toMatchSnapshot());

  test('AT.FETCH_PIPELINE_SELECTED_COUNT.SUCCESS', () =>
    expect(pipelineReducer(initialState, actions.fetchSelectedCount(defaultFilterDimensions))).toMatchSnapshot());

  test('AT.SET_SELECTED_PIPELINE_FEATURES', () =>
    expect(pipelineReducer(initialState, actions.setSelectedFeatures([]))).toMatchSnapshot());

  test('AT.SET_PIPELINE_SYMBOLOGY', () =>
    expect(pipelineReducer(initialState, actions.setSymbology('symbologyDimension'))).toMatchSnapshot());

  test('AT.RESET_PIPELINE_FILTERS', () =>
    expect(pipelineReducer(initialState, actions.resetFilters())).toMatchSnapshot());

  test('AT.SET_PIPELINE_FILTER_DIMENSION', () =>
    expect(pipelineReducer(initialState, actions.setFilterDimension('dimension', 'values'))).toMatchSnapshot());

  test('AT.SET_PIPELINE_FILTER_DIMENSION - dcp_pipeline_status - completion date disabled', () => {
    const state = _.assign({}, initialState, {
      filterDimensions: _.assign({}, initialState.filterDimensions, {
        dcp_pipeline_status: { values: [{ checked: true, value: 'Application filed' }] }
      })
    });

    expect(pipelineReducer(state, actions.setFilterDimension('dcp_pipeline_status', 'values'))).toMatchSnapshot();
  });

  test('AT.SET_PIPELINE_FILTER_DIMENSION - dcp_pipeline_status - completion date enabled', () => {
    const state = _.assign({}, initialState, {
      filterDimensions: _.assign({}, initialState.filterDimensions, {
        dcp_pipeline_status: { values: [{ checked: false, value: 'Application filed' }] }
      })
    });

    expect(pipelineReducer(state, actions.setFilterDimension('dcp_pipeline_status', 'values'))).toMatchSnapshot()
  });

  test('AT.SET_PIPELINE_FILTER_DIMENSION - dcp_pipeline_status - issue date disabled', () => {
    const state = _.assign({}, initialState, {
      filterDimensions: _.assign({}, initialState.filterDimensions, {
        dcp_pipeline_status: { values: [{ checked: true, value: 'Permit issued' }] }
      })
    });

    expect(pipelineReducer(state, actions.setFilterDimension('dcp_pipeline_status', 'values'))).toMatchSnapshot()
  });

  test('AT.SET_PIPELINE_FILTER_DIMENSION - dcp_pipeline_status - issue date enabled', () => {
    const state = _.assign({}, initialState, {
      filterDimensions: _.assign({}, initialState.filterDimensions, {
        dcp_pipeline_status: { values: [{ checked: false, value: 'Permit issued' }] }
      })
    });

    expect(pipelineReducer(state, actions.setFilterDimension('dcp_pipeline_status', 'values'))).toMatchSnapshot()
  });
});
