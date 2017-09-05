import SqlBuilder from './SqlBuilder';
import devTables from '../devTables';

export const sqlConfig = {
  columns: `uid, the_geom_webmercator, facdomain, facname, address, factype, opname,
  borocode`,
  // commboard, censtract, nta, council, cd, congdist, firediv, firebn, fireconum,
  // municourt, policeprecinctjo, schooldistrict, stateassemblydistrict, statesenatedistrict, taz
  tablename: devTables('facdb_20170822'),
};

class FacilitiesSqlBuilder extends SqlBuilder {

  // chunker for the complex hierarchical layer selector
  facilitiesLayerSelector(dimension, filters) {
    const layers = filters[dimension].values;

    const selectedLayers = [];

    layers.forEach((facdomain) => {
      facdomain.children.forEach((group) => {
        group.children.forEach((subgroup) => {
          if (subgroup.checked) {
            selectedLayers.push(subgroup.name);
          }
        });
      });
    });


    let layersChunk = '';

    selectedLayers.forEach((name, i) => {
      if (i > 0) layersChunk += ' OR ';
      layersChunk += `facsubgrp = '${name}'`;
    });

    return (layersChunk.length > 0) ? `(${layersChunk})` : 'false';
  }
}

Object.assign(FacilitiesSqlBuilder, SqlBuilder);

const sqlBuilder = new FacilitiesSqlBuilder(sqlConfig.columns, sqlConfig.tablename);

export const getSql = filterDimensions => sqlBuilder.buildSql(filterDimensions);
