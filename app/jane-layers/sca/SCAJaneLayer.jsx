import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Legend } from '../../jane-maps';
import SCAPlanComponent from './SCAPlanComponent';

import appConfig from '../../helpers/appConfig';

const SCAJaneLayer = ({ handleMapLayerClick }) => (
  <JaneLayer
    id="scaplan"
    name="SCA Capital Plan"
    icon="graduation-cap"
    component={<SCAPlanComponent />}
    defaultDisabled
  >

    <Source
      id="sca-points"
      type="cartovector"
      options={{
        carto_user: appConfig.carto_user,
        carto_domain: appConfig.carto_domain,
        sql: ['SELECT * FROM cpdb_sca_pts_170201'],
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
};

export default SCAJaneLayer;
