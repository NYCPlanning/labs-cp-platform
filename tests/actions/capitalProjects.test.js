import * as actions from '../../app/actions/capitalProjects';
import { defaultFilterDimensions } from '../../app/capitalprojects/config';

describe('actions/capitalProjects', () => {
  test('fetchDetails', () =>
    expect(actions.fetchDetails('capitalProjectId')).toMatchSnapshot());

  test('fetchBudgets', () =>
    expect(actions.fetchBudgets('capitalProjectId')).toMatchSnapshot());

  test('fetchCommitments', () =>
    expect(actions.fetchCommitments('capitalProjectId')).toMatchSnapshot());

  test('fetchTotalPointsCount', () =>
    expect(actions.fetchTotalPointsCount()).toMatchSnapshot());

  test('fetchTotalPolygonsCount', () =>
    expect(actions.fetchTotalPolygonsCount(defaultFilterDimensions)).toMatchSnapshot());

  test('setSelectedFeatures', () =>
    expect(actions.setSelectedFeatures([])).toMatchSnapshot());

  test.only('setFilterDimension', () =>
    expect(actions.setFilterDimension('dimension', 'values')).toMatchSnapshot());

  test('resetFilters', () =>
    expect(actions.resetFilters()).toMatchSnapshot());
});
