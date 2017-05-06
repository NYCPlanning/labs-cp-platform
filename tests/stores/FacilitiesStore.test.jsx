import facilitiesStore from '../../app/stores/FacilitiesStore';
import { defaultFilterDimensions } from '../../app/facilities/config';

// beforeEach(() => {
//   jest.gen('../../app/helpers/ga');
// });

describe('construction and initialization', () => {
  test('sets initial filterDimensions, does not pass by reference', () => {
    jest.mock('../../app/helpers/ga');
    expect(facilitiesStore.filterDimensions).toEqual(defaultFilterDimensions);
  });
});
