import SqlBuilder from './SqlBuilder';
import db_tables from '../../config/db_tables';

export const sqlConfig = {
  columns: '*',
  tablename: db_tables.facdb.facilities,
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
      layersChunk += `facsubgrp = '${name.toUpperCase()}'`;
    });

    return (layersChunk.length > 0) ? `(${layersChunk})` : 'false';
  }
}

Object.assign(FacilitiesSqlBuilder, SqlBuilder);

const sqlBuilder = new FacilitiesSqlBuilder(sqlConfig.columns, sqlConfig.tablename);

export const getSql = filterDimensions => sqlBuilder.buildSql(filterDimensions);
