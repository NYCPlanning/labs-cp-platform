import NycGeom from '../../app/helpers/NycGeom';

test('getGeomConfig returns correct geom type', () => {
  expect(NycGeom.getGeomConfig('cd')).toEqual({
    column: 'borocd',
    dataset: 'support_admin_cdboundaries',
  });

  expect(NycGeom.getGeomConfig('nta')).toEqual({
    column: 'ntacode',
    dataset: 'support_admin_ntaboundries',
  });

  expect(NycGeom.getGeomConfig('something')).toBe('notfound');
});

test('getGeomName returns human readable geometry name', () => {
  expect(NycGeom.getGeomName('cd', '101')).toBe('Manhattan Community District 1');
  expect(NycGeom.getGeomName('nta', 'BX98')).toBe('Rikers Island (BX98)');
  expect(NycGeom.getGeomName('wat', 'BX98')).toBe('notfound');
});

test('getBoroughNameFromId returns borough name', () => {
  expect(NycGeom.getBoroughNameFromId('1')).toBe('Manhattan');
  expect(NycGeom.getBoroughNameFromId('5')).toBe('Staten Island');
  expect(NycGeom.getBoroughNameFromId('9')).toBe('');
});
