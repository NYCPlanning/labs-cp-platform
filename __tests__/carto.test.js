if (process.env.NODE_ENV === 'test') window.$ = require('jquery');
jest.dontMock('carto');

import carto from '../app/helpers/carto';

carto.getFeature('support_admin_cdboundaries', 'borocd', '412').then((d) => {
  console.log(d);
})
.catch((d) => {
  console.log('reject', d);
});

test('gets a single specified geojson feature from a carto table', () => {



  // return expect(carto.getFeature('support_admin_cdboundaries', 'borocd', '412')).resolves.toBe(1)
});
