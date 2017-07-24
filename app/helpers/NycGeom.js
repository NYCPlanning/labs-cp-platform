// nycgeom.js - helper methods for NYC known geometries
// simple known geometries are 'cd' - community district, 'nta' - neighborhood tabulation area, etc
import nta from '../helpers/nta';

const NycGeom = {
  // get the column name and dataset for a given geomType
  getGeomConfig(geomType) {
    if (geomType === 'cd') {
      return {
        column: 'borocd',
        dataset: 'support_admin_cdboundaries',
      };
    } else if (geomType === 'nta') {
      return {
        column: 'ntacode',
        dataset: 'support_admin_ntaboundries',
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
      const boro = this.getBoroughNameFromId(borocode);
      return `${boro} Community District ${cd}`;
    } else if (geomType === 'nta') {
      return `${nta.getNtaName(id)} (${id})`;
    }

    return 'notfound';
  },

  getBoroughNameFromId(id) {
    const borocode = id.toString();

    if (borocode === '1') return 'Manhattan';
    else if (borocode === '2') return 'Bronx';
    else if (borocode === '3') return 'Brooklyn';
    else if (borocode === '4') return 'Queens';
    else if (borocode === '5') return 'Staten Island';
    return '';
  },
};

export default NycGeom;
