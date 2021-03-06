import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer } from '../../jane-maps';

import SidebarComponent from './SidebarComponent';


const AerialsJaneLayer = props => (
  <JaneLayer
    id="aerials"
    name="Aerial Imagery"
    icon="camera"
    selected={props.selected}
    enabled={props.enabled}
    component={<SidebarComponent />}
  >
    <Source
      id="doitt_aerials"
      type="raster"
      tileSize={256}
      tiles={'https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8'}
    />
    <MapLayer
      id="doitt_aerials"
      type="raster"
      source="doitt_aerials"
    />
  </JaneLayer>
);

AerialsJaneLayer.propTypes = {
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
};

AerialsJaneLayer.defaultProps = {
  selected: false,
  enabled: false,
};

export default AerialsJaneLayer;
