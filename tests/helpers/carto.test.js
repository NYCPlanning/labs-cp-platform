import carto from '../../app/helpers/carto';

describe('API calls', () => {
  test.skip('getFeature returns geojson feature', () => {
    // return carto.getFeature('cpdb_map_combined', 'maprojid', '850SER200281')
    //   .then((data) => {
    //     expect(data).toEqual({ features: ['It works!'] });
    //   });

    // NOTE: Resolves keyword will work with Jest 20.0.0+
    // return expect(carto.getFeature('cpdb_map_combined', 'maprojid', '850SER200281')).resolves.toEqual({});
  });

  test.skip('getNYCBounds', () => {
    // nock.recorder.rec({
    //   output_objects: true,
    // });

    // const message = ['1f8b0800000000000003558e410ac2301045af22b3aa908649324d6c965ec0ad20520423146b2276a44ac8dd0dba72fb79eff1333cd232833f649879082f0e91c1c376b76f5a4712d199ceae08a555da9a8d689d91bdd33d9aef48d459bd867214c0e32d8047899a045cc6309d6bf6af9a81dff7cac0335e635a62a32c69aa76a976e2d334fcbea8f201d349275196000000'];
    //

    // return carto.getNYCBounds('nta', 'BK88')
    //   .then((data) => {
    //     // const nockCallObjects = nock.recorder.play();
    //     // console.log(nockCallObjects);
    //     expect(data).toEqual([['-74.007356', '40.612638'], ['-73.972903', '40.644562']]);
    //   });
  });
});

describe('SQL generation', () => {
  beforeEach(() => {
    carto.SQL = jest.fn();
  });

  test('getFeature() generates SQL for string', () => {
    carto.getFeature('cpdb_map_combined', 'maprojid', '850SER200281');
    expect(carto.SQL).toHaveBeenCalledWith('SELECT * FROM cpdb_map_combined WHERE maprojid = \'850SER200281\'');
  });

  test('getFeature() generates SQL for number', () => {
    carto.getFeature('cpdb_map_combined', 'maprojid', 1234);
    expect(carto.SQL).toHaveBeenCalledWith('SELECT * FROM cpdb_map_combined WHERE maprojid = 1234');
  });

  test('getNYCBounds() generates SQL for bounds', () => {
    carto.getNYCBounds('nta', 'BK88');
    expect(carto.SQL).toHaveBeenCalledWith('SELECT ST_Extent(the_geom) FROM support_admin_ntaboundaries WHERE ntacode = \'BK88\'', 'json');
  });

  test('getCount() generates SQL for count', () => {
    carto.getCount('some_table');
    expect(carto.SQL).toHaveBeenCalledWith('SELECT count(*) FROM (some_table) a', 'json');
  });

  test('getFilteredSql() makes a SELECT generic', () => {
    expect(carto.getFilteredSql('SELECT this_column FROM that_table WHERE thing = 1'))
      .toBe('SELECT * FROM that_table WHERE thing = 1');
  });

  test('getCompleteSql() makes a SELECT generic and removes WHERE', () => {
    expect(carto.getCompleteSql('SELECT this_column FROM that_table WHERE thing = 1'))
      .toBe('SELECT * FROM that_table');
  });
});

describe('string generation', () => {
  test('generateUrlString() returns api url string', () => {
    expect(carto.generateUrlString('SELECT * FROM stuff', 'json'))
      .toBe('https://cartoprod.capitalplanning.nyc/user/cpp/api/v2/sql?q=SELECT%20*%20FROM%20stuff&format=json&filename=download');

    expect(carto.generateUrlString('SELECT * FROM stuff', 'json', 'file'))
      .toBe('https://cartoprod.capitalplanning.nyc/user/cpp/api/v2/sql?q=SELECT%20*%20FROM%20stuff&format=json&filename=file');
  });

  test('completeDownloadUrlString() returns full download link', () => {
    Date.now = jest.fn(() => 1482363367071);
    expect(carto.completeDownloadUrlString('SELECT this_column FROM that_table WHERE thing = 1', 'stuff', 'csv'))
      .toBe('https://cartoprod.capitalplanning.nyc/user/cpp/api/v2/sql?q=SELECT%20*%20FROM%20that_table&format=csv&filename=stuff_complete_2016-12-21');
  });

  test('filteredDownloadUrlString() returns full download link', () => {
    Date.now = jest.fn(() => 1482363367071);
    expect(carto.filteredDownloadUrlString('SELECT this_column FROM that_table WHERE thing = 1', 'stuff', 'csv'))
      .toBe('https://cartoprod.capitalplanning.nyc/user/cpp/api/v2/sql?q=SELECT%20*%20FROM%20that_table%20WHERE%20thing%20=%201&format=csv&filename=stuff_filtered_2016-12-21');
  });
});

test.skip('SQL()', () => {

});
