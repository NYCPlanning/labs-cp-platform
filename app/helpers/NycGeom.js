// nycgeom.js - helper methods for NYC known geometries
// simple known geometries are 'cd' - community district, 'nta' - neighborhood tabulation area, etc
import nta from '../helpers/nta.js'

var NycGeom = {
  //get the column name and dataset for a given geomType
  getGeomConfig: function(geomType) {
    if (geomType=='cd') {
      return {
        column: 'borocd',
        dataset: 'cpadmin.dcp_cdboundaries'
      }
    } else if (geomType=='nta') {
      return {
        column: 'ntacode',
        dataset: 'cpadmin.dcp_ntaboundaries'
      }
    }
  },

  getGeomName: function(geomType, id) {
    //return a human-readable geometry name for a given type and ID.
    //For example ('cd', '101') => 'Manhattan Community District 1'
    //TODO make this a sitewide helper method

    var borocode = id.toString()[0]
    var cd = id % 100

    if (geomType == 'cd') {
      var boro = (borocode=='1') ? 'Manhattan' :
        (borocode=='2') ? 'Bronx' :
        (borocode=='3') ? 'Brooklyn' :
        (borocode=='4') ? 'Queens' :
        (borocode=='5') ? 'Staten Island' : 'Invalid ID'
      return `${boro} Community District ${cd}`
    }

    if (geomType == 'nta') {
      return `${nta.getNtaName(id)} (${id})`
    }
  }
}

module.exports = NycGeom