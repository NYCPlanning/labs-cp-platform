/* eslint-disable class-methods-use-this */
import SqlBuilder from '../helpers/SqlBuilder';

class FacilitiesSqlBuilder extends SqlBuilder {

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

export default FacilitiesSqlBuilder;
