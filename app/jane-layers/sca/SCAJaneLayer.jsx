import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Legend } from '../../jane-maps';
import SCAPlanComponent from './SCAPlanComponent';

import appConfig from '../../config/appConfig';
import tables from '../../config/db_tables';

const SCAJaneLayer = ({ handleMapLayerClick, enabled, selected }) => (
  <JaneLayer
    id="scaplan"
    name="SCA Capital Plan"
    icon="graduation-cap"
    component={<SCAPlanComponent />}
    enabled={enabled}
    selected={selected}
  >

    <Source
      id="sca-points"
      type="cartovector"
      options={{
        carto_domain: appConfig.carto_domain,
        sql: [`SELECT * FROM ${tables.sca}`],
      }}
    />

    <MapLayer
      id="sca-points-points"
      source="sca-points"
      sourceLayer="layer0"
      onClick={handleMapLayerClick}
      type="circle"
      paint={{
        'circle-radius': {
          stops: [
            [10, 2],
            [15, 6],
          ],
        },
        'circle-color': '#5C99FF',
        'circle-opacity': 0.7,
      }}
    />

    <MapLayer
      id="sca-points-outline"
      source="sca-points"
      sourceLayer="layer0"
      type="circle"
      paint={{
        'circle-radius': {
          stops: [
            [10, 3],
            [15, 7],
          ],
        },
        'circle-color': '#012700',
        'circle-opacity': 0.7,
      }}
    />

    <Legend id="sca-legend">
      <div>
        <div className="legendSection">SCA Capital Plan</div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: '#5C99FF' }} />
          <div className="legendItemText">SCA Projects</div>
        </div>
      </div>
    </Legend>
  </JaneLayer>
);

SCAJaneLayer.propTypes = {
  handleMapLayerClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
  selected: PropTypes.bool,
};

SCAJaneLayer.defaultProps = {
  enabled: false,
  selected: false,
};

export default SCAJaneLayer;
