// nycgeom.js - helper methods for NYC known geometries
// simple known geometries are 'cd' - community district, 'nta' - neighborhood tabulation area, etc
import nta from '../helpers/nta';

const NycGeom = {
  // get the column name and dataset for a given geomType
  getGeomConfig(geomType) {
    if (geomType === 'cd') {
      return {
        column: 'borocd',
        dataset: 'cpadmin.dcp_cdboundaries',
      };
    } else if (geomType === 'nta') {
      return {
        column: 'ntacode',
        dataset: 'cpadmin.dcp_ntaboundaries',
      };
    }

    return 'notfound';
  },

  getGeomName(geomType, id) {
    // return a human-readable geometry name for a given type and ID.
    // For example ('cd', '101') => 'Manhattan Community District 1'
    // TODO make this a sitewide helper method

    const borocode = id.toString()[0];
    const cd = id % 100;

    if (geomType === 'cd') {
      let boro;

      if (borocode === '1') boro = 'Manhattan';
      else if (borocode === '2') boro = 'Bronx';
      else if (borocode === '3') boro = 'Brooklyn';
      else if (borocode === '4') boro = 'Queens';
      else if (borocode === '5') boro = 'Staten Island';

      return `${boro} Community District ${cd}`;
    } else if (geomType === 'nta') {
      return `${nta.getNtaName(id)} (${id})`;
    }

    return 'notfound';
  },
};

module.exports = NycGeom;
