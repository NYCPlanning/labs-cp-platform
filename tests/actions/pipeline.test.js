import * as actions from '../../app/actions/pipeline';
import { defaultFilterDimensions } from '../../app/pipeline/config';

describe('actions/pipeline', () => {
  test('fetchDetails', () =>
    expect(actions.fetchDetails('cartodbId')).toMatchSnapshot());

  test('fetchTotalCount', () =>
    expect(actions.fetchTotalCount()).toMatchSnapshot());

  test('fetchSelectedCount', () =>
    expect(actions.fetchSelectedCount(defaultFilterDimensions)).toMatchSnapshot());

  test('setSelectedFeatures', () =>
    expect(actions.setSelectedFeatures([])).toMatchSnapshot());

  test('setFilterDimension', () =>
    expect(actions.setFilterDimension('dimension', 'values')).toMatchSnapshot());

  test('setSymbology', () =>
    expect(actions.setSymbology('symbologyDimension')).toMatchSnapshot());

  test('resetFilters', () =>
    expect(actions.resetFilters()).toMatchSnapshot());
});
